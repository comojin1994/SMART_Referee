#!/usr/bin/env python

import sys
import os
import tensorflow as tf
import numpy as np
import pandas as pd
import cv2
import time
sys.path.append('gen-py')

from Analysis import AnalysisService

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from SMART_Referee_server import model
import argparse

from utils.misc_utils import parse_anchors, read_class_names
from utils.nms_utils import gpu_nms
from utils.plot_utils import get_color_table, plot_one_box, draw_strike_zone
from utils.data_aug import letterbox_resize
from utils.Referee_ftns import draw_body, draw_ball, get_ball_coord, get_zone_height, get_batter, get_batter_ankle, cal_dist
from judgement.strike_judgement import strike_judgement, swing_judgement, total_result

from PIL import Image, ImageDraw
from collections import deque

from model import yolov3

class ReportServiceHandler(AnalysisService.Iface):
    def result(self, path):
        global sess, boxes, scores, labels, input_data, no_ball_count, ball_storage, base_coord, \
            batter_count, away_count, batter_ankle_storage, triger_draw_zone, swing_queue, judgement_ball_coord, \
            swing_moment, swing_judge, swing_result_queue, base_len, result, ball_result

        result = -1

        img_name = path.split('/')[-1]

        img_root = path

        img_ori = cv2.imread(img_root)
        if args.letterbox_resize:
            img, resize_ratio, dw, dh = letterbox_resize(img_ori, args.new_size[0], args.new_size[1])
        else:
            height_ori, width_ori = img_ori.shape[:2]
            img = cv2.resize(img_ori, tuple(args.new_size))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = np.asarray(img, np.float32)
        img = img[np.newaxis, :] / 255.

        boxes_, scores_, labels_ = sess.run([boxes, scores, labels], feed_dict={input_data: img})

        # rescale the coordinates to the original image
        if args.letterbox_resize:
            boxes_[:, [0, 2]] = (boxes_[:, [0, 2]] - dw) / resize_ratio
            boxes_[:, [1, 3]] = (boxes_[:, [1, 3]] - dh) / resize_ratio
        else:
            boxes_[:, [0, 2]] *= (width_ori / float(args.new_size[0]))
            boxes_[:, [1, 3]] *= (height_ori / float(args.new_size[1]))

        # draw body
        # img_ori = draw_body(img_root, boxes_, labels_)

        # calculate batter in
        batter_coord = get_batter(boxes_, labels_)
        dist_batter_base = np.abs(
            (base_coord[0][0] + base_coord[1][0]) / 2 - (batter_coord[0] + batter_coord[3]) / 2)

        # make queue for swing judgement
        batter_ankle = get_batter_ankle(batter_coord, boxes_, labels_)
        if (1 in batter_ankle.keys()) and (2 in batter_ankle.keys()) and (5 in batter_ankle.keys()):
            sh_dist = cal_dist(batter_ankle, base_len)
            swing_queue.append(sh_dist)
            if len(swing_queue) == 11:
                swing_queue.popleft()
            swing_result = swing_judgement(swing_moment, swing_queue)
            swing_result_queue.append(swing_result)
            if len(swing_result_queue) == 5:
                swing_result_queue.popleft()


        if dist_batter_base < 80:
            if batter_count < 25:
                batter_ankle = get_batter_ankle(batter_coord, boxes_, labels_)
                for i in range(25):
                    if i in list(batter_ankle.keys()):
                        batter_ankle_storage[i][0] += batter_ankle[i][0]
                        batter_ankle_storage[i][1] += batter_ankle[i][1]
                        batter_ankle_storage[i][2] += 1
            batter_count += 1
            away_count = 0
        else:
            away_count += 1
            if away_count == 25:
                batter_ankle_storage = np.zeros((25, 3))
                batter_count = 0
                triger_draw_zone = 0
                swing_queue = deque()

        # get zone height
        if batter_count == 25:
            zone_height = get_zone_height(base_coord, batter_ankle_storage)
            triger_draw_zone = 1

        # handle ball data and get judgement

        if 26 in labels_:
            no_ball_count = 0
            ball_coord = get_ball_coord(boxes_, labels_)
            ball_storage.append(ball_coord)
        else:
            no_ball_count += 1
            if no_ball_count == 5 and len(ball_storage) != 0:

                if len(ball_storage) >= 20:

                    # get judgement
                    if np.var(ball_storage) > 1000:
                        judgement_ball_coord = ball_storage[-1]
                        ball_result = strike_judgement(base_coord, zone_height, judgement_ball_coord)
                        if 'swing' in swing_result_queue:
                            swing_judge = 'swing'
                        else:
                            swing_judge = 'no_swing'
                        result = total_result(ball_result, swing_judge)

                ball_storage = []

        if np.sum(judgement_ball_coord) != 0:
            img = Image.fromarray(img_ori)
            draw = ImageDraw.Draw(img)
            draw.ellipse((judgement_ball_coord[0] - 3, judgement_ball_coord[1] - 3, judgement_ball_coord[0] + 3,
                          judgement_ball_coord[1] + 3), fill=(0, 0, 255, 255))
            img_ori = np.array(img)

        # draw Ball
        if (len(ball_storage) > 8) and (np.var(ball_storage) > 1000) and (np.var(ball_storage) < 10000):
            img_ori = draw_ball(img_ori, ball_storage, 8)

        # draw strike zone
        if triger_draw_zone == 1:
            draw_strike_zone(img_ori, base_coord, zone_height)

        # draw yolo box
        for i in range(len(boxes_)):
            x0, y0, x1, y1 = boxes_[i]
            plot_one_box(img_ori, [x0, y0, x1, y1], label=args.classes[labels_[i]] + ', {:.2f}%'.format(scores_[i] * 100), color=color_table[labels_[i]])

        cv2.imwrite(os.path.join('/home/ubuntu/test/server_assets/git_work/Data/result', img_name), img_ori)
        print(result, ball_result, swing_judge)
        if result == "Strike":
            res = 1
        elif result == "Ball":
            res = 0
        else:
            res = 2

        return res


def start_server():
    handler = ReportServiceHandler()
    processor = AnalysisService.Processor(handler)
    transport = TSocket.TServerSocket(port=5555)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print('Starting the server...')
    server.serve()
    print('done.')

if __name__ == "__main__":

    global sess, boxes, scores, labels, input_data, no_ball_count, ball_storage, base_coord,\
        batter_count, away_count, batter_ankle_storage, triger_draw_zone, swing_queue, judgement_ball_coord,\
        swing_moment, swing_judge, swing_result_queue, base_len, result, ball_result

    sess = tf.Session()
    parser = argparse.ArgumentParser(description="YOLO-V3 test single image test procedure.")
    # parser.add_argument("--image_dir", type=str, default="/home/ubuntu/test/server_assets/git_work/Data/test",
    #                     help="The path of the input image.")
    parser.add_argument("--anchor_path", type=str, default="./data/yolo_anchors.txt",
                        help="The path of the anchor txt file.")
    parser.add_argument("--new_size", nargs='*', type=int, default=[416, 416],
                        help="Resize the input image with `new_size`, size format: [width, height]")
    parser.add_argument("--letterbox_resize", type=lambda x: (str(x).lower() == 'true'), default=True,
                        help="Whether to use the letterbox resize.")
    parser.add_argument("--class_name_path", type=str,
                        default="./data/my_data/SMART_Referee.names",
                        help="The path of the class names.")
    parser.add_argument("--restore_path", type=str,
                        default=r"/home/ubuntu/server_assets/git_work/Data/labeling_weights_ver05/model-epoch_45_step_16789_loss_15.1716_lr_3e-05",
                        help="The path of the weights to restore.")
    args = parser.parse_args()

    args.anchors = parse_anchors(args.anchor_path)
    args.classes = read_class_names(args.class_name_path)
    args.num_class = len(args.classes)

    color_table = get_color_table(args.num_class)

    input_data = tf.placeholder(tf.float32, [1, args.new_size[1], args.new_size[0], 3], name='input_data')
    yolo_model = yolov3(args.num_class, args.anchors)
    with tf.variable_scope('yolov3', reuse=tf.AUTO_REUSE):
        pred_feature_maps = yolo_model.forward(input_data, False)
    pred_boxes, pred_confs, pred_probs = yolo_model.predict(pred_feature_maps)

    pred_scores = pred_confs * pred_probs

    boxes, scores, labels = gpu_nms(pred_boxes, pred_scores, args.num_class, max_boxes=200, score_thresh=0.3,
                                    nms_thresh=0.45)

    saver =  tf.train.Saver()
    saver.restore(sess, args.restore_path)

    no_ball_count = 0
    ball_storage = []
    base_coord = ((225, 308), (250, 308))
    base_len = np.sqrt((base_coord[0][0] - base_coord[1][0]) ** 2 + (base_coord[0][1] - base_coord[1][1]) ** 2)
    batter_count = 0
    away_count = 0
    batter_ankle_storage = np.zeros((25, 3))
    triger_draw_zone = 0
    judgement_ball_coord = [0, 0]
    swing_queue = deque()
    swing_moment = pd.read_csv('./data/my_data/swing_moment.csv', header=None)[0].tolist()
    swing_judge = result = ball_result = 'no_decision'
    swing_result_queue = deque()

    #model load
    start_server()
    sess.close()
    print("Session closed")

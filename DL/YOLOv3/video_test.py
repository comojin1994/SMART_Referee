# coding: utf-8

from __future__ import division, print_function

import tensorflow as tf
import numpy as np
import argparse
import cv2
import time
import os

from utils.misc_utils import parse_anchors, read_class_names
from utils.nms_utils import gpu_nms
from utils.plot_utils import get_color_table, plot_one_box, draw_strike_zone, draw_baseline, draw_state
from utils.data_aug import letterbox_resize

from model import yolov3

from judgement.strike_judgement import strike_judgement
from draw_pose import draw_body

parser = argparse.ArgumentParser(description="YOLO-V3 video test procedure.")
parser.add_argument("input_video", type=str,
                    help="The path of the input video.")
parser.add_argument("--anchor_path", type=str, default="./data/yolo_anchors.txt",
                    help="The path of the anchor txt file.")
parser.add_argument("--new_size", nargs='*', type=int, default=[416, 416],
                    help="Resize the input image with `new_size`, size format: [width, height]")
parser.add_argument("--letterbox_resize", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to use the letterbox resize.")
parser.add_argument("--class_name_path", type=str, default="./data/coco.names",
                    help="The path of the class names.")
parser.add_argument("--restore_path", type=str, default="./data/darknet_weights/yolov3.ckpt",
                    help="The path of the weights to restore.")
parser.add_argument("--save_video", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to save the video detection results.")
parser.add_argument("--yolo_box", type=lambda x: (str(x).lower() == 'true'), default=False,
                    help="Whether to show the yolo box results.")
parser.add_argument("--pose_line", type=lambda x: (str(x).lower() == 'true'), default=False,
                    help="Whether to show the pose detect results.")
parser.add_argument("--base_line", type=lambda x: (str(x).lower() == 'true'), default=False,
                    help="Whether to show the base line results.")
parser.add_argument("--state", type=lambda x: (str(x).lower() == 'true'), default=False,
                    help="Whether to show the states.")
args = parser.parse_args()

args.anchors = parse_anchors(args.anchor_path)
args.classes = read_class_names(args.class_name_path)
args.num_class = len(args.classes)

color_table = get_color_table(args.num_class)

vid = cv2.VideoCapture(args.input_video)
video_frame_cnt = int(vid.get(7))
video_width = int(vid.get(3))
video_height = int(vid.get(4))
video_fps = int(vid.get(5))

save_video_dir = r'C:\Users\soma\SMART_referee\SMART_Referee_DL\YOLOv3\data\test_result'
img_name = args.input_video.split('/')[-1]

if args.save_video:
    fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
    videoWriter = cv2.VideoWriter(os.path.join(save_video_dir,img_name), fourcc, video_fps, (video_width, video_height))
    # videoWriter = cv2.VideoWriter('video_result.mp4', fourcc, video_fps, (video_width, video_height))

with tf.Session() as sess:
    input_data = tf.placeholder(tf.float32, [1, args.new_size[1], args.new_size[0], 3], name='input_data')
    yolo_model = yolov3(args.num_class, args.anchors)
    with tf.variable_scope('yolov3'):
        pred_feature_maps = yolo_model.forward(input_data, False)
    pred_boxes, pred_confs, pred_probs = yolo_model.predict(pred_feature_maps)

    pred_scores = pred_confs * pred_probs

    boxes, scores, labels = gpu_nms(pred_boxes, pred_scores, args.num_class, max_boxes=200, score_thresh=0.3, nms_thresh=0.45)

    saver = tf.train.Saver()
    saver.restore(sess, args.restore_path)

    #initialize
    stack_boxes = np.zeros([25,5])
    stack_boxes[:,0] = [i for i in range(25)]
    count = 30 #몇 프레임까지 포즈 데이터를 누적할 것인지
    h_min = h_max = 0
    base_coordinate = [[530, 615], [620, 615]]
    circle_stack = []
    judge_x = judge_y = 0
    count_frame = 0
    strike = ball = 0


    for f in range(video_frame_cnt):
        ret, img_ori = vid.read()
        if args.letterbox_resize:
            img, resize_ratio, dw, dh = letterbox_resize(img_ori, args.new_size[0], args.new_size[1])
        else:
            height_ori, width_ori = img_ori.shape[:2]
            img = cv2.resize(img_ori, tuple(args.new_size))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = np.asarray(img, np.float32)
        img = img[np.newaxis, :] / 255.

        start_time = time.time()
        boxes_, scores_, labels_ = sess.run([boxes, scores, labels], feed_dict={input_data: img})
        end_time = time.time()

        # rescale the coordinates to the original image
        if args.letterbox_resize:
            boxes_[:, [0, 2]] = (boxes_[:, [0, 2]] - dw) / resize_ratio
            boxes_[:, [1, 3]] = (boxes_[:, [1, 3]] - dh) / resize_ratio
        else:
            boxes_[:, [0, 2]] *= (width_ori/float(args.new_size[0]))
            boxes_[:, [1, 3]] *= (height_ori/float(args.new_size[1]))


        #######################################

        # 스트라이크 존 그리기
        label_boxes = np.zeros([np.shape(boxes_)[0], 5])
        label_boxes[:,0] = labels_
        label_boxes[:,1:] = boxes_

        new_label_boxes_ = label_boxes[label_boxes[:,1]>700]
        new_boxes_ = new_label_boxes_[:,1:]
        new_labels_ = new_label_boxes_[:,0]

        if f < count + 1:
            for j in range(25):

                temp_boxes = np.zeros([25, 5])
                temp_boxes[:, 0] = [i for i in range(25)]

                if len(new_label_boxes_[new_label_boxes_[:,0]==j]) == 0 :
                    stack_boxes[j,:] += temp_boxes[j,:]
                    continue
                else:
                    temp_boxes[j,1:] = new_label_boxes_[new_label_boxes_[:,0]==j][0,1:]

                    if np.sum(temp_boxes[j,:]) == 0:
                        continue
                    if np.sum(stack_boxes[j,:])==0:
                        stack_boxes[j,:] = temp_boxes[j,:]

                    stack_boxes[j,:] = (stack_boxes[j,:] + temp_boxes[j,:])


        if f==count:
            temp_boxes = stack_boxes / (count+2)

            fix_mean_y_10_13 = (temp_boxes[10,2] + temp_boxes[10,4] + temp_boxes[13,2] + temp_boxes[13,4])/4
            fix_mean_y_8_9_12 = (temp_boxes[8,2] + temp_boxes[8,4] + temp_boxes[9,2] + temp_boxes[9,4] + temp_boxes[12,2] + temp_boxes[12,4])/6
            fix_mean_y_1_2_5 = (temp_boxes[1,2] + temp_boxes[1,4] + temp_boxes[2,2] + temp_boxes[2,4] + temp_boxes[5,2] + temp_boxes[5,4])/6


            h_min = int((base_coordinate[0][1] + base_coordinate[1][1])/2 - fix_mean_y_10_13)
            h_max = int(fix_mean_y_10_13 - (fix_mean_y_8_9_12 + fix_mean_y_1_2_5)/2)



        # draw yolo box
        if args.yolo_box:
            for k in range(len(new_boxes_)):
                x0, y0, x1, y1 = new_boxes_[k]
                plot_one_box(img_ori, [x0, y0, x1, y1], label=args.classes[new_labels_[k]] + ', {:.2f}%'.format(scores_[k] * 100), color=color_table[new_labels_[k]])

        end_time = time.time()
        # 공 detection하기
        if count_frame == 10:
            circle_stack=[[0,0],[0,0]]

        if ret == True:
            frame = cv2.cvtColor(img_ori, cv2.COLOR_BGR2GRAY)
            frame = cv2.medianBlur(frame,5)
            cframe = cv2.cvtColor(frame,cv2.COLOR_GRAY2BGR)

            circles = cv2.HoughCircles(frame,cv2.HOUGH_GRADIENT,1,20,param1=40,param2=22,minRadius=9,maxRadius=10)

            if circles is not None:
                circles = np.uint16(np.around(circles))

                # for i in circles[0,:]:
                i_ = circles[0,:][0]
                ball_x = int(i_[0])
                ball_y = int(i_[1])
                radi = int(i_[2])
                circle_stack.append([ball_x,ball_y])
                # cv2.circle(img_ori,(ball_x,ball_y),radi,(0,255,0),2)
                count_frame = 0
            else:
                if count_frame == 7:
                    len_list = len(circle_stack)
                    if len_list > 5:
                        judge_x = circle_stack[len_list-1][0]
                        judge_y = circle_stack[len_list-1][1]
                        judge_result = strike_judgement(base_coordinate,[h_min,h_max],circle_stack[len_list-1])
                        if judge_result == "Strike":
                            strike += 1
                        else:
                            ball += 1
                        # print(judge_result)
                    circle_stack = []
                    count_frame = 0
                else:
                    count_frame += 1

        if judge_x != 0:
            if judge_result == "Strike":
                cv2.circle(img_ori, (judge_x, judge_y), radi+3, (72, 255, 0), -1)
                cv2.circle(img_ori, (judge_x, judge_y), radi + 3, (0, 0, 0), 2)
                cv2.putText(img_ori, "S", (judge_x-radi+4, judge_y+radi-4), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 2)
            else:
                cv2.circle(img_ori, (judge_x, judge_y), radi+3, (0, 255, 255), -1)
                cv2.circle(img_ori, (judge_x, judge_y), radi + 3, (0, 0, 0), 2)
                cv2.putText(img_ori, "B", (judge_x-radi+4, judge_y+radi-4), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 2)

        # print(count_frame, circle_stack)

        # draw strike zone
        if f>count:
            draw_strike_zone(img_ori, base_coordinate, h_min, h_max)

        # 타자 어깨선 허리선 무릎선 그리기
        if args.base_line:
            draw_baseline(img_ori, new_label_boxes_, base_coordinate)

        # pose detect
        if args.pose_line:
            pose_boxes = np.zeros([25, 5])
            pose_boxes[:, 0] = [i for i in range(25)]

            for j in range(25):

                if len(new_label_boxes_[new_label_boxes_[:, 0] == j]) == 0:
                    continue
                else:
                    pose_boxes[j, 1:] = new_label_boxes_[new_label_boxes_[:, 0] == j][0, 1:]
            draw_body(img_ori, pose_boxes[:, 1:])

        # show state
        if args.state:
            draw_state(img_ori, strike, ball)

        # break
        #######################################


        # original code

        # for i in range(len(boxes_)):
        #     x0, y0, x1, y1 = boxes_[i]
        #     plot_one_box(img_ori, [x0, y0, x1, y1], label=args.classes[labels_[i]] + ', {:.2f}%'.format(scores_[i] * 100), color=color_table[labels_[i]])


        # # time check
        cv2.putText(img_ori, '{:.2f}ms'.format((end_time - start_time) * 1000), (1358, 40), 0,
                    fontScale=1, color=(0, 255, 0), thickness=2)


        cv2.imshow('image', img_ori)
        if args.save_video:
            videoWriter.write(img_ori)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    vid.release()
    if args.save_video:
        videoWriter.release()

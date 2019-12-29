# coding: utf-8

from __future__ import division, print_function

import tensorflow as tf
import numpy as np
import argparse
import cv2
import sys, os
import json
import pandas as pd

from utils.misc_utils import parse_anchors, read_class_names
from utils.nms_utils import gpu_nms
from utils.plot_utils import get_color_table, plot_one_box
from utils.data_aug import letterbox_resize

from model import yolov3

from labeling.darknet_to_coco import dark_to_coco

idx_list = ['Nose', 'Neck', 'RShoulder', 'RElbow', 'RWrist', 'LShoulder', 'LElbow', 'LWrist', 'MidHip', 'RHip', 'RKnee',
            'RAnkle', 'LHip', 'LKnee', 'LAnkle', 'REye', 'LEye', 'REar', 'LEar', 'LBigToe', 'LSmallToe',
            'LHeel', 'RBigToe', 'RSmallToe', 'RHeel', 'Background']

parser = argparse.ArgumentParser(description="YOLO-V3 test single image test procedure.")
parser.add_argument("--image_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\lunge\train_image",
                    help="The path of the input image.")
parser.add_argument("--anchor_path", type=str, default="./data/yolo_anchors.txt",
                    help="The path of the anchor txt file.")
parser.add_argument("--new_size", nargs='*', type=int, default=[416, 416],
                    help="Resize the input image with `new_size`, size format: [width, height]")
parser.add_argument("--letterbox_resize", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to use the letterbox resize.")
parser.add_argument("--class_name_path", type=str, default= "./data/my_data/coco.names",
                    help="The path of the class names.")
parser.add_argument("--restore_path", type=str, default="./data/darknet_weights/yolov3.ckpt",
                    help="The path of the weights to restore.")
parser.add_argument("--json_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\lunge\train",
                    help="The path of the json file.")
parser.add_argument("--output_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\lunge",
                    help="The path of the txt file.")
parser.add_argument("--output_name", type=str, default="train.txt",
                    help="The name of txt file.")
parser.add_argument("--concat_json", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to show the base line results.")
parser.add_argument("--concat_text", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to show the base line results.")
parser.add_argument("--bat_coord", type=lambda x: (str(x).lower() == 'true'), default=False,
                    help="Whether to show the base line results.")
parser.add_argument("--yolo_detect", type=lambda x: (str(x).lower() == 'true'), default=True,
                    help="Whether to show the base line results.")
args = parser.parse_args()

args.anchors = parse_anchors(args.anchor_path)
args.classes = read_class_names(args.class_name_path)
args.num_class = len(args.classes)

color_table = get_color_table(args.num_class)
# yolo_model = yolov3(args.num_class, args.anchors)


with tf.Session() as sess:


    input_data = tf.placeholder(tf.float32, [1, args.new_size[1], args.new_size[0], 3], name='input_data')
    yolo_model = yolov3(args.num_class, args.anchors)
    with tf.variable_scope('yolov3', reuse=tf.AUTO_REUSE):
        pred_feature_maps = yolo_model.forward(input_data, False)
    pred_boxes, pred_confs, pred_probs = yolo_model.predict(pred_feature_maps)

    pred_scores = pred_confs * pred_probs

    boxes, scores, labels = gpu_nms(pred_boxes, pred_scores, args.num_class, max_boxes=200, score_thresh=0.3,
                                    nms_thresh=0.45)

    saver = tf.train.Saver()
    saver.restore(sess, args.restore_path)

    for root, dirs, files in os.walk(args.image_dir):
        for file in [f for f in files if os.path.splitext(f)[-1] == '.jpg']:
            input_image = os.path.join(root,file)
            img_ori = cv2.imread(input_image)
            height, width = img_ori.shape[:2]

            if args.letterbox_resize:
                img, resize_ratio, dw, dh = letterbox_resize(img_ori, args.new_size[0], args.new_size[1])
            else:
                height_ori, width_ori = img_ori.shape[:2]
                img = cv2.resize(img_ori, tuple(args.new_size))
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = np.asarray(img, np.float32)
            img = img[np.newaxis, :] / 255.

            # saver = tf.train.Saver()
            # saver.restore(sess, args.restore_path)

            text_dir = input_image.replace('.jpg', '.txt')
            # print
            sys.stdout = open(text_dir, 'w')

            if args.yolo_detect:

                boxes_, scores_, labels_ = sess.run([boxes, scores, labels], feed_dict={input_data: img})

                # rescale the coordinates to the original image
                if args.letterbox_resize:
                    boxes_[:, [0, 2]] = (boxes_[:, [0, 2]] - dw) / resize_ratio
                    boxes_[:, [1, 3]] = (boxes_[:, [1, 3]] - dh) / resize_ratio
                else:
                    boxes_[:, [0, 2]] *= (width_ori/float(args.new_size[0]))
                    boxes_[:, [1, 3]] *= (height_ori/float(args.new_size[1]))

                new_labels_ = np.reshape(labels_, (len(labels_), 1))
                temp = np.concatenate((new_labels_, boxes_), axis = 1)

                for l in temp:

                    if l[0] == 0:
                    # if l[0] in (0, 32):
                        x_center = (l[1]+l[3])/(2*width)
                        y_center = (l[2]+l[4])/(2*height)
                        w = (l[3]-l[1])/width
                        h = (l[4]-l[2])/height
                        if l[0] == 0:
                            # person
                            print('%d %.6f %.6f %.6f %.6f' % (18, x_center, y_center, w, h))

                    '''
                    if l[0] in (26, 27, 28, 29):
                    # if l[0] in (0, 32):
                        x_center = (l[1]+l[3])/832
                        y_center = (l[2]+l[4])/832
                        w = (l[3]-l[1])/416
                        h = (l[4]-l[2])/416
                        if l[0] == 27:
                            # person
                            print('%d %.6f %.6f %.6f %.6f' % (0, x_center, y_center, w, h))
                        elif l[0] == 26:
                            # Baseball
                            print('%d %.6f %.6f %.6f %.6f' % (26, x_center, y_center, w, h))
                        elif l[0] == 28:
                            # bat start
                            print('%d %.6f %.6f %.6f %.6f' % (28, x_center, y_center, w, h))
                        else:
                            # bat end
                            print('%d %.6f %.6f %.6f %.6f' % (29, x_center, y_center, w, h))
                    '''

            # bat code
            # if args.bat_coord:
            #     print('%d %.6f %.6f %.6f %.6f' % (28, 0.1, 0.2, 0.024038, 0.024038))
            #     print('%d %.6f %.6f %.6f %.6f' % (29, 0.13, 0.2, 0.024038, 0.024038))

            # Concat json data
            if args.concat_json:

                json_name = file.replace(".jpg", "_keypoints.json")
                with open(os.path.join(args.json_dir, json_name)) as json_file:
                    json_data = json.load(json_file)
                    df = pd.DataFrame(columns=['idx', 'xmin', 'ymin', 'xmax', 'ymax'])

                    for people in json_data['people']:
                        keypoints = np.array(people['pose_keypoints_2d'])
                        keypoints = keypoints.reshape((len(keypoints) // 3, 3))[:, :-1]

                        bound_data = np.zeros((keypoints.shape[0], 4))

                        bound_data[:, 0] = keypoints[:, 0]
                        bound_data[:, 1] = keypoints[:, 1]
                        bound_data[:, 2] = 10/width
                        bound_data[:, 3] = 10/height

                        temp = pd.DataFrame(columns=['idx', 'x_center', 'y_center', 'width', 'hight'])
                        temp['idx'] = np.array([str(i) for i in range(keypoints.shape[0])])
                        temp[['x_center', 'y_center', 'width', 'hight']] = bound_data
                        temp.drop(temp.query('x_center == y_center == 0 ').index, inplace=True)
                        temp['x_center'] = temp['x_center'] / width
                        temp['y_center'] = temp['y_center'] / height

                        # temp[['x_center', 'y_center', 'width', 'hight']] = temp[['x_center', 'y_center', 'width', 'hight']].astype(
                        #     str)

                        df = df.append(temp)
                        for i in temp.values:
                            print("%s %.6f %.6f %.6f %.6f" % (i[0], i[1], i[2], i[3], i[4]))


            sys.stdout.close()


if args.concat_text:
    dark_to_coco(args.image_dir, args.output_dir, args.output_name)
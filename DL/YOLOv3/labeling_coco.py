# coding: utf-8

from __future__ import division, print_function

import tensorflow as tf
import numpy as np
import argparse
import cv2
import sys, os

from utils.misc_utils import parse_anchors, read_class_names
from utils.nms_utils import gpu_nms
from utils.plot_utils import get_color_table, plot_one_box
from utils.data_aug import letterbox_resize

from model import yolov3

parser = argparse.ArgumentParser(description="YOLO-V3 test single image test procedure.")
parser.add_argument("--image_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416",
                    help="The path of the input image.")
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
            text_dir = input_image.replace('.jpg', '.txt')
            sys.stdout = open(text_dir, 'w')
            for l in temp:
                if l[0] in (0, 32):
                    x_center = (l[1]+l[3])/832
                    y_center = (l[2]+l[4])/832
                    w = (l[3]-l[1])/416
                    h = (l[4]-l[2])/416
                    if l[0] == 0:
                        print('%d %.6f %.6f %.6f %.6f' % (27, x_center, y_center, w, h))
                    else:
                        print('%d %.6f %.6f %.6f %.6f' % (26, x_center, y_center, w, h))
            # print('%d %.6f %.6f %.6f %.6f' % (28, 0.1, 0.2, 0.024038, 0.024038))
            # print('%d %.6f %.6f %.6f %.6f' % (29, 0.13, 0.2, 0.024038, 0.024038))
            sys.stdout.close()
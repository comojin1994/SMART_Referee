# coding: utf-8

from __future__ import division, print_function

import tensorflow as tf
import numpy as np
import argparse
import cv2
import os

from utils.misc_utils import parse_anchors, read_class_names
from utils.nms_utils import gpu_nms
from utils.plot_utils import get_color_table, plot_one_box, draw_strike_zone
from utils.data_aug import letterbox_resize
from utils.Referee_ftns import draw_body, draw_ball, get_ball_coord, get_zone_height, get_batter, get_batter_ankle
from judgement.strike_judgement import strike_judgement

from model import yolov3

no_ball_count = 0
ball_storage = []
base_coord = ((225, 308), (250, 308))
batter_count = 0
away_count = 0
batter_ankle_storage = np.zeros((25, 3))
triger_draw_zone = 0


def model(path, sess, boxes, scores, labels, input_data, no_ball_count, ball_storage, base_coord, batter_count, away_count, batter_ankle_storage, triger_draw_zone):
    img_root = path

    img_ori = cv2.imread(img_root)

    img, resize_ratio, dw, dh = letterbox_resize(img_ori, 416, 416)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = np.asarray(img, np.float32)
    img = img[np.newaxis, :] / 255.

    boxes_, scores_, labels_ = sess.run([boxes, scores, labels], feed_dict={input_data: img})

    # rescale the coordinates to the original image

    boxes_[:, [0, 2]] = (boxes_[:, [0, 2]] - dw) / resize_ratio
    boxes_[:, [1, 3]] = (boxes_[:, [1, 3]] - dh) / resize_ratio

    # draw body
    # img_ori = draw_body(img_root, boxes_, labels_)

    batter_coord = get_batter(boxes_, labels_)
    dist_batter_base = (base_coord[0][0] + base_coord[1][0]) / 2 - (batter_coord[0] + batter_coord[3]) / 2

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

    # get zone height
    if batter_count == 25:
        zone_height = get_zone_height(base_coord, batter_ankle_storage)
        triger_draw_zone = 1
        batter_count = 0

    # handle ball data and get judgement
    if 26 in labels_:
        no_ball_count = 0
        ball_coord = get_ball_coord(boxes_, labels_)
        ball_storage.append(ball_coord)
    else:
        no_ball_count += 1
        if no_ball_count == 5:
            judgement_ball_coord = ball_storage[-1]
            # get judgement
            result = strike_judgement(base_coord, zone_height, judgement_ball_coord)
            ball_storage = []

    if result == "Strike":
        return 1
    elif result == "Ball":
        return 0
    else:
        return 2
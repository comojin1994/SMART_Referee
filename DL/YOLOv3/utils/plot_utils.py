# coding: utf-8

from __future__ import division, print_function

import cv2
import random
import numpy as np

def get_color_table(class_num, seed=2):
    random.seed(seed)
    color_table = {}
    for i in range(class_num):
        color_table[i] = [random.randint(0, 255) for _ in range(3)]
    return color_table


def plot_one_box(img, coord, label=None, color=None, line_thickness=None):
    '''
    coord: [x_min, y_min, x_max, y_max] format coordinates.
    img: img to plot on.
    label: str. The label name.
    color: int. color index.
    line_thickness: int. rectangle line thickness.
    '''
    tl = line_thickness or int(round(0.002 * max(img.shape[0:2])))  # line thickness
    color = color or [random.randint(0, 255) for _ in range(3)]
    c1, c2 = (int(coord[0]), int(coord[1])), (int(coord[2]), int(coord[3]))
    cv2.rectangle(img, c1, c2, color, thickness=tl)
    # print label

    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=float(tl) / 3, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3

        cv2.rectangle(img, c1, c2, color, -1)  # filled
        cv2.putText(img, label, (c1[0], c1[1] - 2), 0, float(tl) / 3, [0, 0, 0], thickness=tf, lineType=cv2.LINE_AA)

def draw_strike_zone(img, base_coordinate, zone_height):

    h_min = int(zone_height[0])
    h_max = int(zone_height[1])

    b_x0 = base_coordinate[0][0]
    b_x1 = base_coordinate[1][0]
    b_y0 = base_coordinate[0][1]
    b_y1 = base_coordinate[1][1]
    w = 2
    #outline
    cv2.line(img, (b_x0,b_y1 - h_min),(b_x1, b_y1 - h_min),(255,255,255),w) # bottom
    cv2.line(img, (b_x0,b_y1 - h_min), (b_x0, b_y0 - h_min - h_max), (255,255,255), w) #left
    cv2.line(img, (b_x0, b_y0 - h_min - h_max), (b_x1, b_y0 - h_min - h_max), (255,255,255), w) # right
    cv2.line(img, (b_x1, b_y1 - h_min), (b_x1, b_y0 - h_min - h_max), (255,255,255), w) #top

    #inner line
    cv2.line(img, (b_x0, int(b_y1-h_min-h_max/3)), (b_x1, int(b_y1-h_min-h_max/3)),(255,255,255),w)
    cv2.line(img, (b_x0, int(b_y1 - h_min - h_max*(2 / 3))), (b_x1, int(b_y1 - h_min - h_max*(2 / 3))), (255, 255, 255), w)
    cv2.line(img, (int(b_x0 + (b_x1 - b_x0)/3),b_y0-h_min-h_max), (int(b_x0 + (b_x1 - b_x0)/3), b_y1-h_min), (255,255,255),w)
    cv2.line(img, (int(b_x0 + (b_x1 - b_x0)*(2 / 3)), b_y0 - h_min - h_max), (int(b_x0 + (b_x1 - b_x0)*(2 / 3)), b_y1 - h_min),
             (255, 255, 255), w)



def draw_baseline(img, temp_boxes, base_coordinate):
    temp1 = temp2 = temp3 = 0

    li_10_13 = temp_boxes[np.any([temp_boxes[:,0] == 10, temp_boxes[:,0] == 13], axis=0)]
    for i in range(len(li_10_13)):
        temp1 = temp1 + (li_10_13[i,2] + li_10_13[i,4])
    mean_y_10_13 = int(temp1/(len(li_10_13)*2)) if len(li_10_13) != 0 else None

    li_8_9_12 = temp_boxes[np.any([temp_boxes[:,0] == 8, temp_boxes[:,0] == 9, temp_boxes[:,0] == 12], axis=0)]
    for i in range(len(li_8_9_12)):
        temp2 = temp2 + (li_8_9_12[i, 2] + li_8_9_12[i, 4])
    mean_y_8_9_12 = int(temp2 / (len(li_8_9_12)*2)) if len(li_8_9_12) != 0 else None

    li_1_2_5 = temp_boxes[np.any([temp_boxes[:,0] == 1, temp_boxes[:,0] == 2, temp_boxes[:,0] == 5], axis=0)]
    for i in range(len(li_1_2_5)):
        temp3 = temp3 + (li_1_2_5[i, 2] + li_1_2_5[i, 4])
    mean_y_1_2_5 = int(temp3 / (len(li_1_2_5)*2)) if len(li_1_2_5) != 0 else None

    # mean_y_10_13 = int((temp_boxes[10, 2] + temp_boxes[10, 4] + temp_boxes[13, 2] + temp_boxes[13, 4]) / 4)
    # mean_y_8_9_12 = int((temp_boxes[8, 2] + temp_boxes[8, 4] + temp_boxes[9, 2] + temp_boxes[9, 4] + temp_boxes[
    #     12, 2] + temp_boxes[12, 4]) / 6)
    # mean_y_1_2_5 = int((temp_boxes[1, 2] + temp_boxes[1, 4] + temp_boxes[2, 2] + temp_boxes[2, 4] + temp_boxes[
    #     5, 2] + temp_boxes[5, 4]) / 6)
    if mean_y_10_13 and mean_y_1_2_5 and mean_y_8_9_12:
        cv2.line(img, (base_coordinate[1][0] + 120, mean_y_1_2_5), (base_coordinate[1][0] + 20, mean_y_1_2_5),
                 (57, 235, 235), 4)
        cv2.line(img, (base_coordinate[1][0] + 120, mean_y_8_9_12), (base_coordinate[1][0] + 20, mean_y_8_9_12),
                 (57, 235, 235), 4)
        cv2.line(img, (base_coordinate[1][0] + 120, mean_y_10_13), (base_coordinate[1][0] + 20, mean_y_10_13),
                 (57, 235, 235), 4)

def draw_state(img, strike, ball):
    # print(strike, ball)
    cv2.rectangle(img, (25, 25), (325, 165), (0,0,0), -1)
    cv2.rectangle(img, (25,25), (325,165), (255,255,255), 2)


    cv2.putText(img,"S", (55,65),0,1,(72, 255, 0),2)
    cv2.putText(img, "B", (55,105), 0, 1, (0, 255, 255), 2)
    cv2.putText(img, "O", (55, 145), 0, 1, (0, 51, 255), 2)
    #strike
    cv2.circle(img,(130, 55), 15, (255,255,255),-1)
    cv2.circle(img, (170, 55), 15, (255, 255, 255), -1)

    #Ball
    cv2.circle(img, (130, 95), 15, (255, 255, 255), -1)
    cv2.circle(img, (170, 95), 15, (255, 255, 255), -1)
    cv2.circle(img, (210, 95), 15, (255, 255, 255), -1)

    #out
    cv2.circle(img, (130, 135), 15, (255, 255, 255), -1)
    cv2.circle(img, (170, 135), 15, (255, 255, 255), -1)

    for i in range(strike):
        cv2.circle(img, (130+i*40, 55), 13, (72, 255, 0), -1)
    for j in range(ball):
        cv2.circle(img, (130+j*40, 95), 13, (0, 255, 255), -1)

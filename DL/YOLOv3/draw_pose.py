import cv2
import numpy as np
from random import randint

def draw_body(img, boxes_):
    mean_boxes = np.zeros([np.shape(boxes_)[0],2])
    mean_boxes[:, 0] = (boxes_[:,0] + boxes_[:,2])/2
    mean_boxes[:, 1] = (boxes_[:, 1] + boxes_[:,3])/2
    # print(mean_boxes)
    pair_list = [[0,1],[0,15],[0,16],[1,2],[1,5],[1,8],[2,3],[3,4],[5,6],[6,7],[8,9],[8,12],[9,10],[10,11],[11,22],
                 [12,13],[13,14],[14,19],[15,17],[16,18],[11,24],[22,23],[14,21],[19,20]]
    # part_pair_list = [[1,2],[1,5],[1,8],[8,9],[8,12],[9,10],[12,13],[2,3],[5,6]]

    for i, c in enumerate(pair_list):
        if int(mean_boxes[c[0], 0]) == 0 or int(mean_boxes[c[1], 0]) == 0:
            continue
        cv2.line(img, (int(mean_boxes[c[0], 0]), int(mean_boxes[c[0], 1])), (int(mean_boxes[c[1], 0]), int(mean_boxes[c[1], 1])),
                 (0,255,0), 5)

    '''
    cv2.line(img, (int(mean_boxes[0,0]),int(mean_boxes[0,1])),(int(mean_boxes[1,0]),int(mean_boxes[1,1])),(0,255,0),2)
    cv2.line(img, (int(mean_boxes[0, 0]), int(mean_boxes[0, 1])), (int(mean_boxes[15, 0]), int(mean_boxes[15, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[0, 0]), int(mean_boxes[0, 1])), (int(mean_boxes[16, 0]), int(mean_boxes[16, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[1, 0]), int(mean_boxes[1, 1])), (int(mean_boxes[2, 0]), int(mean_boxes[2, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[1, 0]), int(mean_boxes[1, 1])), (int(mean_boxes[5, 0]), int(mean_boxes[5, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[1, 0]), int(mean_boxes[1, 1])), (int(mean_boxes[8, 0]), int(mean_boxes[8, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[2, 0]), int(mean_boxes[2, 1])), (int(mean_boxes[3, 0]), int(mean_boxes[3, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[3, 0]), int(mean_boxes[3, 1])), (int(mean_boxes[4, 0]), int(mean_boxes[4, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[5, 0]), int(mean_boxes[5, 1])), (int(mean_boxes[6, 0]), int(mean_boxes[6, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[6, 0]), int(mean_boxes[6, 1])), (int(mean_boxes[7, 0]), int(mean_boxes[7, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[8, 0]), int(mean_boxes[8, 1])), (int(mean_boxes[9, 0]), int(mean_boxes[9, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[8, 0]), int(mean_boxes[8, 1])), (int(mean_boxes[12, 0]), int(mean_boxes[12, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[9, 0]), int(mean_boxes[9, 1])), (int(mean_boxes[10, 0]), int(mean_boxes[10, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[10, 0]), int(mean_boxes[10, 1])), (int(mean_boxes[11, 0]), int(mean_boxes[11, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[11, 0]), int(mean_boxes[11, 1])), (int(mean_boxes[22, 0]), int(mean_boxes[22, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[12, 0]), int(mean_boxes[12, 1])), (int(mean_boxes[13, 0]), int(mean_boxes[13, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[13, 0]), int(mean_boxes[13, 1])), (int(mean_boxes[14, 0]), int(mean_boxes[14, 1])),
             (0, 255, 0), 2)
    cv2.line(img, (int(mean_boxes[14, 0]), int(mean_boxes[14, 1])), (int(mean_boxes[19, 0]), int(mean_boxes[19, 1])),
             (0, 255, 0), 2)
    '''
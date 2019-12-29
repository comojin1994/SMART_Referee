import numpy as np
import pandas as pd
import os
import argparse
import sys

parser = argparse.ArgumentParser(description="COCO format to Dartkent format")
parser.add_argument("--text_dir", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\train.txt',
                    help="The path of the text file.")
parser.add_argument("--save_dir", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416',
                    help="The save directory.")
args = parser.parse_args()

data = open(args.text_dir,'r')
while True:
    li = data.readline()
    if not li: break
    output_name = li.split(' ')[1].split('\\')[-1].replace('.jpg', '.txt')
    sys.stdout = open(os.path.join(args.save_dir, output_name), 'w')
    result_li = []
    w, h = 0.024038, 0.024038
    for i in range(len(li.split(' ')[4:])):
        box_data = li.split(' ')[4:]
        if i % 5 == 0:
            result_li.append(box_data[i])
            result_li.append('%.6f' % ((int(box_data[i + 3]) + int(box_data[i + 1])) / 826))
            result_li.append('%.6f' % ((int(box_data[i + 4]) + int(box_data[i + 2])) / 826))
            result_li.append(w)
            result_li.append(h)
            print('%s %s %s %s %s' % (result_li[i], result_li[i+1], result_li[i+2], result_li[i+3], result_li[i+4]))
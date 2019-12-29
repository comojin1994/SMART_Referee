import numpy as np
import os
import csv
import sys

img_dir = r'C:\Users\comoj\SMART_Referee\data\image_416_416'
f = open('output.csv', 'a', encoding='utf-8', newline='')
wr = csv.writer(f)

for root, dirs, files in os.walk(img_dir):
    for file in [f for f in files if os.path.splitext(f)[-1] == '.txt']:
        txt = open(os.path.join(root, file), 'r')
        while True:
            line = txt.readline().strip('\n')
            print(line.split(' '))
            if not line: break

        break
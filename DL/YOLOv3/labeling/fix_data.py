import os
import numpy as np
import pandas as pd
import sys

text_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\labeling_data\ball_data\train'

def fix_text(text_dir):
    for root, dirs, files in os.walk(text_dir):
        for file in [f for f in files if os.path.splitext(f)[-1] == '.txt']:
            data = open(os.path.join(root, file), 'r')
            file_list = data.readlines()
            sys.stdout = open(os.path.join(root, file), 'w')
            for line in file_list:
                line = line[:-2]
                line_list = line.split(' ')
                if float(line_list[1]) > 1 or float(line_list[2]) > 1 or float(line_list[3]) > 1 or float(line_list[4]) > 1:
                    continue
                else:
                    print(line)
            sys.stdout.close()

fix_text(text_dir)
import os
import sys
import numpy as np
import pandas as pd
import cv2
from PIL import Image
#
# text_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416'
# output_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train'
#
# output_name = 'train.txt'

# text_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\test'
# output_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\test_re'
# output_name = 'test.txt'

def dark_to_coco(text_dir, output_dir, output_name):
    sys.stdout = open(os.path.join(output_dir, output_name),"w")

    for root, dir, files in os.walk(text_dir):
        idx = 0
        for f in [f for f in files if os.path.splitext(f)[-1] == ".txt"]:
            txt_f = open(os.path.join(text_dir, f), "r")
            cor = txt_f.readlines()

            data = np.zeros([len(cor),5])

            for i in range(len(cor)):
                temp = cor[i].split(' ')
                for j in range(5):
                    data[i,j] = float(temp[j])

            img_name = f.replace(".txt", ".jpg")
            # img = Image.open(os.path.join(text_dir, img_name))
            img_ori = cv2.imread(os.path.join(root, img_name))
            h, w = img_ori.shape[:2]


            col_name = ['class', 'xcenter', 'ycenter', 'width', 'height', 'xmin', 'ymin', 'xmax', 'ymax']
            df = pd.DataFrame(columns=col_name)
            for i in range(5):
                df[col_name[i]] = data[:,i]

            df['xmin'] = (df['xcenter'] - df['width'] / 2) * w
            df['xmin'][df['xmin'] < 0] = 0
            df['ymin'] = (df['ycenter'] - df['height'] / 2) * h
            df['ymin'][df['ymin'] < 0] = 0
            df['xmax'] = (df['xcenter'] + df['width'] / 2) * w
            df['ymax'] = (df['ycenter'] + df['height'] / 2) * h



            df = df.loc[:,['class', 'xmin', 'ymin', 'xmax', 'ymax']]
            df[['class', 'xmin', 'ymin', 'xmax', 'ymax']] = df[['class', 'xmin', 'ymin', 'xmax', 'ymax']].astype(int).astype(str)

            df_to_array = df.values.flatten()
            data_list = df_to_array.tolist()
            data = ' '.join(data_list)

            if len(data) != 0:
                print("%d %s %d %d %s"%(idx, os.path.join(text_dir, img_name), w, h, data))
                idx += 1
    sys.stdout.close()

# dark_to_coco(text_dir, output_dir, output_name)
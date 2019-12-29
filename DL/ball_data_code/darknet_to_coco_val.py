import os
import sys
import numpy as np
import pandas as pd
from PIL import Image

base_dir = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\judgement'
data_dir = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\judgement_data\val_data'
output_dir = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\judgement_data\ball_judgement_result'

output_name = 'ball_coordinate_val.txt'

sys.stdout = open(os.path.join(output_dir, output_name),"w")

for root, dir, files in os.walk(data_dir):
    idx = 0
    for f in [f for f in files if os.path.splitext(f)[-1] == ".txt"]:
        txt_f = open(os.path.join(data_dir, f), "r")
        cor = txt_f.readlines()

        data = np.zeros([len(cor),5])

        for i in range(len(cor)):
            temp = cor[i].split(' ')
            for j in range(5):
                data[i,j] = float(temp[j])

        img_name = f.replace(".txt", ".jpg")
        img = Image.open(os.path.join(data_dir, img_name))
        w, h = img.size


        col_name = ['class', 'xcenter', 'ycenter', 'width', 'height', 'xmin', 'ymin', 'xmax', 'ymax']
        df = pd.DataFrame(columns=col_name)
        for i in range(5):
            df[col_name[i]] = data[:,i]

        df['xmin'] = (df['xcenter'] - df['width'] / 2) * w
        df['ymin'] = (df['ycenter'] - df['height'] / 2) * h
        df['xmax'] = (df['xcenter'] + df['width'] / 2) * w
        df['ymax'] = (df['ycenter'] + df['height'] / 2) * h

        df = df.loc[:,['class', 'xmin', 'ymin', 'xmax', 'ymax']]
        df[['class', 'xmin', 'ymin', 'xmax', 'ymax']] = df[['class', 'xmin', 'ymin', 'xmax', 'ymax']].astype(int).astype(str)

        df_to_array = df.values.flatten()
        data_list = df_to_array.tolist()
        data = ' '.join(data_list)

        print("%d %s %d %d %s"%(idx, os.path.join(data_dir, img_name), w, h, data))
        idx += 1
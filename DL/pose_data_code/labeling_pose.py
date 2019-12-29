import json
import os
import numpy as np
from PIL import Image
import pandas as pd
import sys
import argparse


idx_list = ['Nose', 'Neck', 'RShoulder', 'RElbow', 'RWrist', 'LShoulder', 'LElbow', 'LWrist', 'MidHip', 'RHip', 'RKnee',
            'RAnkle', 'LHip', 'LKnee', 'LAnkle', 'REye', 'LEye', 'REar', 'LEar', 'LBigToe', 'LSmallToe',
            'LHeel', 'RBigToe', 'RSmallToe', 'RHeel', 'Background']

parser = argparse.ArgumentParser(description="Resize image to 416x416 to train")

parser.add_argument("--json_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416_json",
                    help="The path of the json file.")
parser.add_argument("--img_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416",
                    help="The path of the resized image.")
parser.add_argument("--output_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train",
                    help="The path of the txt file.")
parser.add_argument("--output_name", type=str, default="train.txt",
                    help="The name of txt file.")
args = parser.parse_args()


for root, dirs, files in os.walk(args.json_dir):
    idx = 0
    sys.stdout = open(os.path.join(args.output_dir, args.output_name), 'w')
    for file in [f for f in files if os.path.splitext(f)[-1] == '.json']:
        img_name = file.replace('_keypoints.json', '.jpg')
        # img = Image.open(os.path.join(args.img_dir,img_name))
        # w, h = img.size
        w, h = 416, 416


        with open(os.path.join(root,file)) as json_file:
            json_data = json.load(json_file)
            df = pd.DataFrame(columns=['idx', 'xmin', 'ymin', 'xmax', 'ymax'])


            for people in json_data['people']:
                keypoints = np.array(people['pose_keypoints_2d'])
                keypoints = keypoints.reshape((len(keypoints)//3, 3))[:,:-1]

                bound_data=np.zeros((keypoints.shape[0], 4))

                bound_data[:,0] = keypoints[:,0]
                bound_data[:,1] = keypoints[:,1]
                bound_data[:,2] = keypoints[:,0]
                bound_data[:,3] = keypoints[:,1]


                temp = pd.DataFrame(columns=['idx', 'xmin', 'ymin', 'xmax', 'ymax'])
                temp['idx'] = np.array([str(i) for i in range(keypoints.shape[0])])
                temp[['xmin', 'ymin', 'xmax', 'ymax']] = bound_data
                temp.drop(temp.query('xmin == ymin == xmax == ymax == 0 ').index, inplace=True)
                temp['xmin'] -= w / 200
                temp['xmin'][temp['xmin'] < 0] = 0
                temp['ymin'] -= h / 200
                temp['ymin'][temp['ymin'] < 0] = 0
                temp['xmax'] += w / 200
                temp['ymax'] += h / 200

                temp[['xmin', 'ymin', 'xmax', 'ymax']] = temp[['xmin', 'ymin', 'xmax', 'ymax']].astype(int).astype(str)


                df = df.append(temp)

            df_to_array = df.values.flatten()
            data_list = df_to_array.tolist()
            data = ' '.join(data_list)


            if len(data) != 0:
                print("%d %s %d %d %s" % (idx, os.path.join(args.img_dir, img_name), w, h, data))
                idx += 1

            # txt_name = img_name.replace('.png', '.txt')
            #
            # df.to_csv(os.path.join(root, txt_name), sep=' ', float_format='%.6f', header=False, index=False)




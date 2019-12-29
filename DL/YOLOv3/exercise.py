import os
import json
import sys
import csv
import pprint
import pandas as pd
import numpy as np

json_dir = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\openpose_json'



for root, dirs, files in os.walk(json_dir):
    for f in [f for f in files if os.path.splitext(f)[-1] == '.json']:
        with open(os.path.join(json_dir, f)) as json_file:
            json_data = json.load(json_file)
            df = pd.DataFrame(columns=['idx', 'xcenter', 'ycenter'])

            for people in json_data['people']:
                keypoints = np.array(people['pose_keypoints_2d'])
                keypoints = keypoints.reshape((len(keypoints) // 3, 3))[:, :-1]
                keypoints = keypoints.flatten()
                keypoints = keypoints.astype(int)

                f = open('openpose_json.csv', 'a', encoding='utf-8', newline='')
                wr = csv.writer(f)
                wr.writerow(keypoints)

print('End')
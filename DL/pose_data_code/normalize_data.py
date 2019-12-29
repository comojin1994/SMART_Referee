import numpy as np
import pandas as pd
import os

csv_dir = r'C:\Users\comoj\SMART_Referee\data\output.csv'
col_names = ['class', 'nose_x', 'nose_y', 'neck_x', 'neck_y', 'rshoulder_x', 'rshoulder_y', 'relbow_x', 'relbow_y',
             'rwrist_x', 'rwrist_y', 'lshoulder_x', 'lshoulder_y', 'lelbow_x', 'lelbow_y', 'lwrist_x', 'lwrist_y',
             'midhip_x', 'midhip_y', 'rhip_x', 'rhip_y', 'rknee_x', 'rknee_y', 'rankle_x', 'rankle_y',
             'lhip_x', 'lhip_y', 'lknee_x', 'lknee_y', 'lankle_x', 'lankle_y', 'reye_x', 'reye_y',
             'leye_x', 'leye_y', 'rear_x', 'rear_y', 'lear_x', 'lear_y', 'lbigtoe_x', 'lbigtoe_y',
             'lsmalltoe_x', 'lsmalltoe_y', 'lheel_x', 'lhell_y', 'rbigtoe_x', 'rbigtoe_y', 'rsmalltoe_x', 'rsmalltoe_y',
             'rheel_x', 'rheel_y']

df = pd.read_csv(csv_dir, names=col_names)
# df['head_x'] = (df['nose_x']+df['reye_x']+df['leye_x']+df['rear_x']+df['lear_x'])/5
# df['head_y'] = (df['nose_y']+df['reye_y']+df['leye_y']+df['rear_y']+df['lear_y'])/5

new_df = pd.DataFrame( columns=col_names)
new_df['class'] = df['class']

def cal_euclidean(col3, col4, col1=df['neck_x'], col2=df['neck_y']):
    normal = np.sqrt((col1 - col3)**2 + (col2 - col4)**2)
    col3 = (col1-col3)/normal
    col4 = (col2-col4)/normal
    return col3, col4

for i in range(1, 26):
    x = col_names[2*i-1]
    y = col_names[2*i]
    new_df[x], new_df[y] = cal_euclidean(df[x], df[y])
new_df = new_df.fillna(0)
print(new_df)
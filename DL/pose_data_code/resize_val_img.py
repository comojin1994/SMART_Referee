import os
import numpy as np
from PIL import Image
import pandas as pd
import sys


base_root = r'C:\Users\soma\SMART_referee\openpose-1.5.0-binaries-win64-gpu-python-flir-3d_recommended\output_train'
img_root = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\val_data'
output_root = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\resize_val_data'


for root, dirs, files in os.walk(img_root):
    for file in [f for f in files if os.path.splitext(f)[-1]=='.jpg']:
        img = Image.open(os.path.join(img_root,file))
        new_w = 416
        new_h = 416
        img = img.resize((new_w, new_h), Image.ANTIALIAS)
        img.save(os.path.join(output_root,file))

import os
import numpy as np
from PIL import Image
import pandas as pd
import sys


img_root = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\lunge\train_image'
output_root = r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\lunge\resized_train_image'


for root, dirs, files in os.walk(img_root):
    for file in [f for f in files if os.path.splitext(f)[-1]=='.jpg']:
        img = Image.open(os.path.join(img_root,file))
        new_w = 416
        new_h = 416
        img = img.resize((new_w, new_h), Image.ANTIALIAS)
        img.save(os.path.join(output_root,file))
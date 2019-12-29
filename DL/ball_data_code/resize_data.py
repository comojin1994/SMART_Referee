import os
import numpy as np
from PIL import Image
import pandas as pd
import sys
import argparse

parser = argparse.ArgumentParser(description="Resize image to 416x416 to train")

parser.add_argument("--img_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image",
                    help="The path of the image.")
parser.add_argument("--output_dir", type=str, default=r"C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\image_416_416",
                    help="The path of the resized image.")
args = parser.parse_args()


for root, dirs, files in os.walk(args.img_dir):
    for file in [f for f in files if os.path.splitext(f)[-1]=='.jpg']:
        img = Image.open(os.path.join(args.img_dir,file))
        new_w = 416
        new_h = 416
        img = img.resize((new_w, new_h), Image.ANTIALIAS)
        img.save(os.path.join(args.output_dir,file))
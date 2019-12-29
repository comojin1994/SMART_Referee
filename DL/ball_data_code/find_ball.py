import os
import sys
import shutil
import argparse

parser = argparse.ArgumentParser(description="YOLO-V3 test single image test procedure.")
parser.add_argument("--text_dir", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\val\image_416_416',
                    help="The path of the input image.")
parser.add_argument("--output_dir", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\labeling_data\ball_data\val',
                    help="The path of the input image.")
parser.add_argument("--json_dir", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\val\image_416_416_pose_json',
                    help="The path of the input image.")
parser.add_argument("--output_json", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\labeling_data\ball_data\val_json',
                    help="The path of the input image.")
parser.add_argument("--output_txt", type=str, default=r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\labeling_data\ball_data\val_txt',
                    help="The path of the input image.")
args = parser.parse_args()


text_dir = args.text_dir
output_dir = args.output_dir
json_dir = args.json_dir
output_json = args.output_json
output_txt = args.output_txt


for root, dirs, files in os.walk(text_dir):
    for file in [f for f in files if os.path.splitext(f)[-1] == ".txt"]:
        data = open(os.path.join(root, file), 'r').readlines()
        for line in data:
            label = int(line[:-2].split(' ')[0])
            if label == 0:
                img_name = file.replace(".txt", ".jpg")
                # json_name = file.replace(".txt", "_keypoints.json")
                shutil.copyfile(os.path.join(root,file), os.path.join(output_txt, file))
                shutil.copyfile(os.path.join(root,img_name), os.path.join(output_dir, img_name))
                # shutil.copyfile(os.path.join(json_dir, json_name), os.path.join(output_json, json_name))

                # ball_data = open(os.path.join(output_txt, file), 'r').readlines()
                # sys.stdout = open(os.path.join(output_dir, file), 'w')
                # for ball_line in ball_data:
                #     if int(ball_line[:-2].split(' ')[0]) in (26, 27):
                #         print("%s" % ball_line[:-2])
                # print('%d %.6f %.6f %.6f %.6f' % (28, 0.1, 0.2, 0.024038, 0.024038))
                # print('%d %.6f %.6f %.6f %.6f' % (29, 0.13, 0.2, 0.024038, 0.024038))

                sys.stdout.close()
                continue

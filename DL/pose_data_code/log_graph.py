import numpy as np
import matplotlib.pyplot as plt
import os
import argparse
import pandas as pd

parser = argparse.ArgumentParser(description="YOLO-V3 log graph")
parser.add_argument("--log_dir", type=str, default=r"C:\Users\comoj\SMART_Referee\SMART_Referee_DL\YOLOv3\data\progress.log", help="Put log file name.")
parser.add_argument("--save_dir", type=str, default=r"C:\Users\comoj\SMART_Referee\SMART_Referee_DL\YOLOv3\data\graph", help="Put log file name.")
args = parser.parse_args()

log_dir = args.log_dir
save_dir = args.save_dir

log_file = open(log_dir,'r')
loss_data = []
val_data = []

for _ in range(12208):
    line = log_file.readline().split(" ")
    if len(line) == 32: # 32
        loss_data.append(line)
    elif len(line) in [7,12,14]:
        val_data.append(line)
    else:
        continue

# 6,7,8,9,11,12,13,14,15,16,17,18,19,20,21

# loss data
Epoch = []
global_step = []
total_loss = []
xy = []
wh = []
conf = []
class_ = []

for i in range(len(loss_data)):
    Epoch.append(int(loss_data[i][7][0:-1]))
    global_step.append(int(loss_data[i][9]))
    total_loss.append(float(loss_data[i][13][0:-1]))
    xy.append(float(loss_data[i][15][0:-1]))
    wh.append(float(loss_data[i][17][0:-1]))
    conf.append(float(loss_data[i][19][0:-1]))
    class_.append(float(loss_data[i][21]))

# val data
v_Epoch = []
v_global_step = []
map = []
v_total_loss = []
v_xy = []
v_wh = []
v_conf = []
v_class_ = []

for i in range(len(val_data)):
    if i%3 == 0:
        v_Epoch.append(int(val_data[i][8][0:-1]))
        v_global_step.append(int(val_data[i][10][0:-3]))
    elif i%3 == 1:
        map.append(float(val_data[i][-1][0:-1]))
    else:
        v_total_loss.append(float(val_data[i][3][0:-1]))
        v_xy.append(float(val_data[i][5][0:-1]))
        v_wh.append(float(val_data[i][7][0:-1]))
        v_conf.append(float(val_data[i][9][0:-1]))
        v_class_.append(float(val_data[i][11][0:-1]))

log_file.close()

plt.figure(figsize=(10,5))


start = 0 #100
end = len(global_step) #500

ax = plt.subplot(111)
box = ax.get_position()
ax.set_position([box.x0, box.y0,box.width*0.8,box.height])
plt.plot(global_step[start:end], total_loss[start:end])
plt.plot(global_step[start:end], xy[start:end])
plt.plot(global_step[start:end], wh[start:end])
plt.plot(global_step[start:end], conf[start:end])
plt.plot(global_step[start:end], class_[start:end])
plt.legend(['total_loss', "xy", "wh", "conf", "class"], loc="center right",bbox_to_anchor=(1.25,0.5), fancybox=True)
plt.xlabel("global step")
plt.ylabel("total loss")
plt.grid(ls='--')

fig, ax1 = plt.subplots()
# box = ax1.get_position()
# ax1.set_position([box.x0, box.y0,box.width*0.8,box.height])
ax2 = ax1.twinx()

line1 = ax1.plot(v_global_step, map)
line2 = ax2.plot(v_global_step, v_total_loss)
line3 = ax2.plot(v_global_step, v_xy)
line4 = ax2.plot(v_global_step, v_wh)
line5 = ax2.plot(v_global_step, v_conf)
line6 = ax2.plot(v_global_step, v_class_)

lines = line1 + line2 + line3 + line4 + line5 + line6
labels = ["map", "total_loss", "xy_loss", "wh_loss", "conf_loss", "class_loss"]
plt.legend(lines, labels, loc="upper right" , fancybox=True)
ax1.set_xlabel("global step")
ax1.set_ylabel("map")
ax2.set_ylabel("total loss")
plt.grid(ls='--')

plt.show()
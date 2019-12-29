import os
import sys
from PIL import Image

def change_variable(line, width, height):
    temp = line.split(' ')
    label = int(temp[0])
    x = float(temp[1])
    y = float(temp[2])
    w = float(temp[3])
    h = float(temp[4])
    xmin = int((x - w/2)*width)
    ymin = int((y - h/2)*height)
    xmax = int((x + w/2)*width)
    ymax = int((y + h/2)*height)
    result = "%d %d %d %d %d " % (label, xmin, ymin, xmax, ymax)
    return result


base_root = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\test'
save_root = r'C:\Users\soma\SMART_referee\YOLOv3_TensorFlow-master\data\my_data'
output_name = 'output.txt'

#저장 경로지정
sys.stdout = open(os.path.join(save_root,output_name),'w')


for root, dirs, files in os.walk(base_root):
    ind = 0
    for fname in [f for f in files if os.path.splitext(f)[-1] == '.txt']:

        img_name = fname.replace('.txt', '.jpg')
        img = Image.open(os.path.join(base_root, img_name))
        width, height = img.size


        full_fname = os.path.join(root, fname)

        f = open(("%s" % full_fname),'r')

        li = []
        # line = f.readlines()
        # print(line)
        # re = change_variable(line)
        # li.append(re)

        while True:
            line = f.readline()
            if not line: break
            re = change_variable(line, width, height)
            li.append(re)
        f.close()

        re='%d %s %d %d ' % (ind, full_fname, width, height)
        for i in range(len(li)):
            re = re + li[i]
        ind += 1
        print(re)

        break
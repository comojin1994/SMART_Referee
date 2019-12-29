import cv2
import numpy as np

cap = cv2.VideoCapture(r'C:\Users\soma\SMART_Referee\SMART_Referee_DL\data\training_data\train\train_01.mp4')

fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.mp4', fourcc, 5, (416, 416))

while True:
    ret, frame = cap.read()
    if ret == True:
        b = cv2.resize(frame, (416, 416), fx=0, fy=0, interpolation=cv2.INTER_CUBIC)
        out.write(b)
    else:
        break

cap.release()
out.release()
cv2.destroyAllWindows()
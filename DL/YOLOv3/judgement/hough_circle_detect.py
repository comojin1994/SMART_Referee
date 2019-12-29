import cv2
import numpy as np
import argparse
import sys

sys.stdout = open(r'C:\Users\comoj\BTs\strike_judgement\result.txt', 'w')
parse = argparse.ArgumentParser(description="test")
parse.add_argument("--video_path", type=str, default=r"C:\Users\comoj\BTs\strike_judgement\data\gameone_02.mp4", help="The path of the video")
args = vars(parse.parse_args())

vid = cv2.VideoCapture(args["video_path"])

if (vid.isOpened()==False):
    print("Error opening video stream or file")

fourcc = cv2.VideoWriter_fourcc('m','p','4','v')
videoWriter = cv2.VideoWriter('video_result.mp4', fourcc, 20.0, (972,546))

while(vid.isOpened()):
    ret, frame = vid.read()
    if ret == True:
        frame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        frame = cv2.medianBlur(frame,5)
        cframe = cv2.cvtColor(frame,cv2.COLOR_GRAY2BGR)

        circles = cv2.HoughCircles(frame,cv2.HOUGH_GRADIENT,1,20,param1=40,param2=22,minRadius=9,maxRadius=10)


        if circles is not None:
            circles = np.uint16(np.around(circles))

            for i in circles[0,:]:
                print(i)
                cv2.circle(cframe,(i[0],i[1]),i[2],(0,255,0),2)


        cv2.imshow('Frame', cframe)
        videoWriter.write(cframe)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    else:
        break

vid.release()

cv2.destroyAllWindows()

#호프만 원 예제
# img_dir = r'C:\Users\comoj\BTs\strike_judgement\data\hough_ex2.jpg'
# greenLower = (230,230,230)
# greenUpper = (255,255,255)
#
#
# img = cv2.imread(img_dir,0)
# img = cv2.medianBlur(img,5)
# cimg = cv2.cvtColor(img,cv2.COLOR_GRAY2BGR)
#
# circles = cv2.HoughCircles(img,cv2.HOUGH_GRADIENT,1,20,param1=40,param2=20,minRadius=0,maxRadius=10)
#
# circles = np.uint16(np.around(circles))
# for i in circles[0,:]:
#     cv2.circle(cimg,(i[0],i[1]),i[2],(0,255,0),2)
#
# cv2.imshow('detected circles', cimg)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
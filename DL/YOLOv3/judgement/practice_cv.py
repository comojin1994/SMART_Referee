import cv2
import os
from strike_judgement import strike_judgement

img_dir = r'C:\Users\comoj\BTs\strike_judgement\data\img.jpg'
save_dir = r'C:\Users\comoj\BTs\strike_judgement\data'

img = cv2.imread(img_dir,1)

lineThickenss = 2

base_coordinate = [[1035, 805], [1195, 789]]

zone_height = [100, 200]
r = int((base_coordinate[1][0] - base_coordinate[0][0])*(18/215))
z_xmin = base_coordinate[0][0]
z_xmax = base_coordinate[1][0]

z_ymin = base_coordinate[0][1] - zone_height[0] - zone_height[1]
z_ymax = base_coordinate[1][1] - zone_height[0]

ball_coordinate = [996, 574] # [z_xmin - 10, z_ymin - 10]

# ball
# cv2.line(img, (989, 566), (1002,579),(0,255,0),lineThickenss)
# cv2.rectangle(img, (983, 561), (1009,587), (0,255,0), lineThickenss)
cv2.circle(img, (ball_coordinate[0], ball_coordinate[1]), r, (0,255,0), lineThickenss)

# base line
# cv2.circle(img, (1035,805), 1, (255,0,0), lineThickenss)
# cv2.line(img, (base_coordinate[0][0], base_coordinate[0][1]), (base_coordinate[1][0], base_coordinate[1][1]),(255,0,0),lineThickenss)

# strie zone
cv2.line(img, (z_xmin, z_ymax), (z_xmax, z_ymax),(0,0,255),lineThickenss) # bottom
cv2.line(img, (z_xmin, z_ymin), (z_xmax, z_ymin),(0,0,255),lineThickenss) # top
cv2.line(img, (z_xmin, z_ymax), (z_xmin, z_ymin),(0,0,255),lineThickenss) # left_h
cv2.line(img, (z_xmax, z_ymax), (z_xmax, z_ymin),(0,0,255),lineThickenss) # right_h

cv2.putText(img, strike_judgement(base_coordinate, zone_height, ball_coordinate), (ball_coordinate[0] - r,ball_coordinate[1] - r), cv2.FONT_HERSHEY_COMPLEX, 1, (0,255,0), 2)

cv2.imwrite(os.path.join(save_dir, 'result.jpg'), img)

cv2.imshow('image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()

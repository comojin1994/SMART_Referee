import numpy as np
from statsmodels.stats.weightstats import ttest_ind

def cal_Euclidean_dist(x1, y1, x2, y2):
    return np.sqrt(((x1 - x2)**2 + (y1 - y2)**2))

def strike_judgement(base_coordinate, zone_height, ball_coordinate):
    '''
    homebase length = 43cm = b_x1 - b_x0 pixel
    ball radius = 3.6cm
        r = int((b_x1-b_x0)*(18/215))

    base_coordinate = [[b_x0, b_y0], [b_x1, b_y1], [b_x2, b_y2], [b_x3, b_y3]]
    zone_height = [h_min, h_max]
        h_min = mean(b_y0, b_y1) - mean_Y(10,13)
        h_max = mean_Y(10,13) - (mean_Y(8,9,12) - mean_Y(1,2,5)/2
    ball_coordinate = [ball_x, ball_y]
    '''

    # 변수 정리
    z_xmin = base_coordinate[0][0]
    z_xmax = base_coordinate[1][0]

    z_ymin = base_coordinate[0][1] - zone_height[0] - zone_height[1]
    z_ymax = base_coordinate[1][1] - zone_height[0]

    ball_x = ball_coordinate[0]
    ball_y = ball_coordinate[1]

    z_xcenter = (z_xmax + z_xmin)/2
    z_ycenter = (z_ymax + z_ymin)/2

    r = int((base_coordinate[1][0] - base_coordinate[0][0])*(18/215))

    # 스트라이크 존 안에 들어온 공 판별
    if (z_xmin <= ball_x and ball_x <= z_xmax) and (z_ymin <= ball_y and ball_y <= z_ymax):
        return "Strike"
    else:
        # 3,5,6,8번 영역 계산
        if (z_xmin <= ball_x and ball_x <= z_xmax):
            if abs(z_ycenter - ball_y) - (z_ycenter - z_ymin)/2 <= r:
                return "Strike"
            else:
                return "Ball"
        elif (z_ymin <= ball_y and ball_y <= z_ymax):
            if abs(z_xcenter - ball_x) - (z_xcenter - z_xmin)/2 <= r:
                return "Strike"
            else:
                return "Ball"
        else:
            # 2,4,7,9번 영역 계산
            if ball_x < z_xmin and ball_y < z_ymin:
                if cal_Euclidean_dist(ball_x, ball_y, z_xmin, z_ymin) <= r:
                    return "Strike"
                else:
                    return "Ball"
            elif z_xmax < ball_x and ball_y < z_ymin:
                if cal_Euclidean_dist(ball_x, ball_y, z_xmax, z_ymin) <= r:
                    return " Strike"
                else:
                    return "Ball"
            elif ball_x < z_xmin and z_ymax < ball_y:
                if cal_Euclidean_dist(ball_x, ball_y, z_xmin, z_ymax) <= r:
                    return "Strike"
                else:
                    return "Ball"
            else:
                if cal_Euclidean_dist(ball_x, ball_y, z_xmax, z_ymax) <= r:
                    return "Strike"
                else:
                    return "Ball"

def swing_judgement(swing_moment, swing_queue):
    pvalue = ttest_ind(swing_moment, swing_queue)[1]
    if pvalue > 0.05:
        return 'swing'
    else:
        return 'no_swing'

def total_result(ball_result, swing_result):
    if ball_result == 'Strike':
        return 'Strike'
    elif swing_result == 'swing':
        return 'Strike'
    else:
        return 'Ball'
import cv2
#from matplotlib import pyplot as plt
import sys
import os
from PIL import Image




save_path = os.path.dirname(os.path.realpath(sys.argv[0]))
   
def imageProc(inputFileName): 
    img = cv2.imread(save_path+'/public/'+sys.argv[3]+'/'+inputFileName, 0)
    edges = cv2.Canny(img,100,200)
    return 1, edges
    

if __name__ == "__main__":	
    inputFileName = sys.argv[1]
    flag, output = imageProc(inputFileName)

    if flag:
      cv2.imwrite(save_path+'/public/'+sys.argv[4]+'/'+sys.argv[1], output)

    print 1;
    # print sys.argv[0]    
    # print save_path
    # print sys.argv[1]    
    # print sys.argv[2]   
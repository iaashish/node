import cv2
from matplotlib import pyplot as plt
import sys
import os

save_path = os.path.dirname(os.path.realpath(sys.argv[0]))
   
def image(a): 
    img = cv2.imread(a,0)
    edges = cv2.Canny(img,100,200)
    plt.subplot(121),plt.imshow(img,cmap = 'gray')
    plt.title('Original Image'), plt.xticks([]), plt.yticks([])
    plt.subplot(122),plt.imshow(edges,cmap = 'gray')
    plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
    plt.imsave(save_path+'\public\uploads/'+sys.argv[2], edges,cmap = 'gray', format='png')
    #plt.show()
    
    
    return plt

if __name__ == "__main__":	
    a = sys.argv[1]
    image(a)



# import cv2
# from matplotlib import pyplot as plt
# import sys
# import os 
# dir_path = os.path.dirname(os.path.realpath(__file__))

# save_path = dir_path+'/public/uploads/'
   
# def image(a): 
    # img = cv2.imread(a,0)
    # edges = cv2.Canny(img,100,200)
    # plt.subplot(121),plt.imshow(img,cmap = 'gray')
    # plt.title('Original Image'), plt.xticks([]), plt.yticks([])
    # plt.subplot(122),plt.imshow(edges,cmap = 'gray')
    # plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
    # plt.imsave(save_path+'image1.png', edges,cmap = 'gray', format='png')
    # plt.show()
    
    
    # return plt

# if __name__ == "__main__":
	# a = sys.argv[1]
	# image(a).show()
	
	
# import matplotlib.pyplot as plt
# from skimage import data
# from skimage import color
# from skimage import img_as_float

# grayscale_image = img_as_float(data.camera()[::2, ::2])
# image = color.gray2rgb(grayscale_image)

# red_multiplier = [1, 0, 0]
# yellow_multiplier = [1, 1, 0]

# fig, (ax1, ax2) = plt.subplots(ncols=2, figsize=(8, 4), sharex=True, sharey=True)
# ax1.imshow(red_multiplier * image)
# ax2.imshow(yellow_multiplier * image)
# ax1.set_adjustable('box-forced')
# ax2.set_adjustable('box-forced')
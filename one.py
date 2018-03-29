#!/usr/bin/python
# -*- coding: utf-8 -*-
import cv2
from matplotlib import pyplot as plt
import sys
import os

save_path = os.path.dirname(os.path.realpath(sys.argv[0]))


def image(a):
    img = cv2.imread(a, 0)
    edges = cv2.Canny(img, 100, 200)
    plt.subplot(121), plt.imshow(img, cmap='gray')
    plt.title('Original Image'), plt.xticks([]), plt.yticks([])
    plt.subplot(122), plt.imshow(edges, cmap='gray')
    plt.title('Edge Image'), plt.xticks([]), plt.yticks([])
    plt.imsave(save_path + '\public\uploads/' + sys.argv[2], edges,
               cmap='gray', format='png')
    print '1'


if __name__ == '__main__':
    a = sys.argv[1]
    image(a)
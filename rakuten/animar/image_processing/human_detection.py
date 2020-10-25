"""
author : Takahiro Suzuki
date   : 2020/09/18
description :
this script detect that human is in image or not.
you should note that we detect human only by naive method.
"""

import numpy as np
import argparse
import base64
import cv2
import os.path as osp

CURRENT_DIR = osp.dirname(__file__)


def toArrayImg(data_bs64: str) -> np.ndarray:
    """
    convert base64 data to ndarray.

    Parameter
    -----------
    data_bs64 : base64 data

    Return
    -----------
    array : converted base64 data
    """
    decoded = base64.b64decode(data_bs64)
    array = np.frombuffer(decoded, dtype=np.uint8)
    img = cv2.imdecode(array, cv2.IMREAD_COLOR)
    return img


def output_formatter(detector):
    """
    this is a decoretor function.
    enforce the format of following detectors' outsput.

    Parameter
    -----------
    detector : any detector

    Return
    -----------
    wrapper : detector whose output is reshaped.
    """

    def wrapper(img: np.ndarray, cascade_path: str, color: tuple =(255, 0, 0)):
        """
        Parameter
        -----------
        img : ndarray image data.
        cascade_path : pretrained cascade file path.
        color : BGR values (B, G, R)

        Return
        -----------
        img : image with boundingbox
        mask : mask image which is created based on boundingbox
        """
        assert osp.isfile(cascade_path), "cascadefile not existed."

        rect = detector(img, cascade_path)
        mask = np.zeros_like(img)
        for x, y, w, h in rect:
            rect = [(x, y), (x + w, y), (x, y + h), (x + w, y + h)]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 6)
            cv2.rectangle(mask, (x, y), (x + w, y + h), (255, 255, 255), cv2.FILLED)
        return img, mask

    return wrapper



@output_formatter
def detect_face(img: np.ndarray, face_cascade_path: str) -> list:
    """
    this is a face detector, and following function 'detect_eye' is very similar with this function (so I omitted doc string).
    you should note that this function is decoreted by 'output_formatter' function.

    Parameter
    -----------
    img : ndarray image data. PIL type image is not preferable (you will probably get an error).
    face_cascade_path: pretrained cascade file path.

    Return
    -----------
    faces : list of boundingboxes. each of them consists of upper left point's coordinate (x and y), width, and height.
    """
    face_cascade = cv2.CascadeClassifier(face_cascade_path)
    gray_img = cv2.cvtColor(img.copy(), cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray_img, )

    return faces


@output_formatter
def detect_eye(img: np.ndarray, eye_cascade_path: str) -> list:
    eye_cascade = cv2.CascadeClassifier(eye_cascade_path)
    gray_img = cv2.cvtColor(img.copy(), cv2.COLOR_BGR2GRAY)

    eyes = eye_cascade.detectMultiScale(gray_img, )

    return eyes


def detect_human(img: np.ndarray) -> bool:
    """
    this is a main function in this script.
    detect humain is in image or not by the following steps.
    STEP1: detect human face in the image or not, and if detected, we will use mask image later.
    STEP2: detect human eye in the image or not, and if detected, we will use mask image later.
    STEP3: by using obtained two mask images, we apply AND opperation to them.
    STEP4: If output of AND opperation is black image, then we assume human not to be in the image, and vice versa.

    Parameter
    -----------
    image : ndarray image data. PIL type image is not preferable (you will probably get an error).

    Return
    -----------
    humanIsin : boolean. If human is in the image, then return True, otherwise False.
    """
    _, mask1 = detect_face(img, osp.join(CURRENT_DIR, "haarcascades/haarcascade_frontalface_default.xml"))
    _, mask2 = detect_eye(img, osp.join(CURRENT_DIR, "haarcascades/haarcascade_eye.xml"))

    dst = cv2.bitwise_and(mask1, mask2)
    humanIsin = np.sum(dst) > 0
    return humanIsin


def main():
    parser = argparse.ArgumentParser(
        description="This script detects human in image or not.\n You should note that we detect human by naive method."
        )

    parser.add_argument("image", help="image file path")
    args = parser.parse_args()
    image = cv2.imread(args.image)
    humanIsin = detect_human(image)
    print(humanIsin)

if __name__ == "__main__":
    main()

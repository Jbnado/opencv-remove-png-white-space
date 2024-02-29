import { Rect } from "mirada/dist/src/types/opencv";
import { FC, useEffect, useRef } from "react";

const OpenCVImageCropper: FC<{
  src: string;
  width: number;
  height: number;
}> = ({ src, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadImageAndCrop = async () => {
      if (!window.cv || !canvasRef.current) return;

      if (!window.cv.onRuntimeInitialized) {
        // If OpenCV.js is not yet fully initialized, wait for it
        window.cv.onRuntimeInitialized = () => loadImageAndCrop();
        return;
      }

      const image = new Image();
      image.src = src;

      image.onload = async () => {
        const { cv } = window;

        const srcMat = cv.imread(image);

        // Split the image channels
        const channels = new cv.MatVector();
        cv.split(srcMat, channels);

        // The alpha channel is the fourth channel
        const alpha = channels.get(3);

        // Create a mask using alpha channel
        const mask = new cv.Mat();
        cv.threshold(alpha, mask, 0, 255, cv.THRESH_BINARY);

        // Find contours based on the mask
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(
          mask,
          contours,
          hierarchy,
          cv.RETR_EXTERNAL,
          cv.CHAIN_APPROX_SIMPLE
        );

        // Find the bounding box of the non-white region
        let majorArea = 0;
        let boundingRect;
        for (let i = 0; i < Number(contours.size()); ++i) {
          const cnt = contours.get(i);
          const area = cv.contourArea(cnt, false);
          if (area > majorArea) {
            majorArea = area;
            boundingRect = cv.boundingRect(cnt);
          }
        }

        // Crop the original image based on the bounding box
        const croppedMat = srcMat.roi(boundingRect as Rect);

        // Resize the cropped image to the specified width and height with INTER_LINEAR interpolation
        const resizedMat = new cv.Mat();
        cv.resize(
          croppedMat,
          resizedMat,
          new cv.Size(width, height),
          0,
          0,
          cv.INTER_LINEAR
        );

        // Display the result on the canvas
        cv.imshow(canvasRef.current!.id, resizedMat);

        // Release memory
        srcMat.delete();
        channels.delete();
        alpha.delete();
        mask.delete();
        contours.delete();
        hierarchy.delete();
        croppedMat.delete();
        resizedMat.delete();
      };

      image.src = src;
    };

    loadImageAndCrop();
  }, [src, width, height]);

  return (
    <canvas className="canvas" ref={canvasRef} id={String(Math.random())} />
  );
};

export default OpenCVImageCropper;

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

      const image = new Image();
      image.src = src;

      image.onload = async () => {
        const { cv } = window;

        const srcMat = cv.imread(image);
        const dstMat = new cv.Mat();

        // Convert the image to grayscale
        cv.cvtColor(srcMat, dstMat, cv.COLOR_RGBA2GRAY);

        // Find contours to identify the non-white regions
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(
          dstMat,
          contours,
          hierarchy,
          cv.RETR_EXTERNAL,
          cv.CHAIN_APPROX_SIMPLE
        );

        // Find the bounding box of the non-white region
        const boundingRect = cv.boundingRect(contours.get(0));

        // Crop the original image based on the bounding box
        const croppedMat = srcMat.roi(boundingRect);

        // Resize the cropped image to the specified width and height
        const resizedMat = new cv.Mat();
        cv.resize(croppedMat, resizedMat, new cv.Size(width, height));

        // Display the result on the canvas
        cv.imshow(canvasRef.current!.id, resizedMat);

        // Release memory
        srcMat.delete();
        dstMat.delete();
        contours.delete();
        hierarchy.delete();
        croppedMat.delete();
        resizedMat.delete();
      };

      image.src = src;
    };

    loadImageAndCrop();
  }, [src, width, height]);

  return <canvas ref={canvasRef} id="opencv-canvas" />;
};

export default OpenCVImageCropper;

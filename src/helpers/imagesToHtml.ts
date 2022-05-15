import { Image } from "../types";
import { imageToHtml } from "./imageToHtml";

export const imagesToHtml = (images: Image[], timeBetween: number) => {
  return images.map((image: Image, index: number) =>
    imageToHtml(image, index, timeBetween)
  );
};

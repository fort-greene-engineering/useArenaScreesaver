import { Image } from "../types";
import { formatImage } from "./formatImage";

export const formatImageArray = (images: any[]): Image[] => {
  return images.map(formatImage);
};

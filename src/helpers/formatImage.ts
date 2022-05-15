import { Image } from "../types";

export const formatImage = (image: any): Image => {
  if (image.source === null) {
    return {
      id: image.id,
      alt: image.description,
      src: image.image.display.url,
    };
  } else {
    return {
      id: image.id,
      alt: image.description,
      src: image.source.url,
    };
  }
};

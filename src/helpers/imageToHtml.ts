import { Image } from "../types";

export const IMAGE_MAX_WIDTH = 500;
export const IMAGE_MIN_WIDTH = 200;

export const imageToHtml = (
  image: Image,
  index: number,
  timeBetween: number
) => {
  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.classList.add("screensaver-image");
  img.style.right = `${
    Math.floor(Math.random() * window.innerWidth) - IMAGE_MAX_WIDTH
  }px`;
  img.style.top = `${Math.random() * window.innerHeight}px`;
  img.style.width = `${
    Math.floor(Math.random() * (IMAGE_MAX_WIDTH - IMAGE_MIN_WIDTH)) +
    IMAGE_MIN_WIDTH
  }px`;
  setTimeout(function () {
    img.classList.add("animated");
    img.classList.add("fade-in-up");
  }, index * timeBetween);
  return img;
};

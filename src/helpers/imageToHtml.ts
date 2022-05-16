import { Image } from "../types";

export const IMAGE_MAX_WIDTH = 500;
export const IMAGE_MIN_WIDTH = 200;

export const IMAGE_MAX_HEIGHT = 700;
export const IMAGE_MIN_HEIGHT = 300;

export const imageToHtml = (
  image: Image,
  index: number,
  timeBetween: number
) => {
  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.classList.add("arena-screensaver-image");
  img.style.left = `${Math.floor(
    Math.random() * (window.innerWidth - IMAGE_MAX_WIDTH)
  )}px`;
  img.style.top = `${Math.floor(
    Math.random() * (window.innerHeight - IMAGE_MAX_HEIGHT / 2)
  )}px`;
  img.style.width = `${
    Math.floor(Math.random() * (IMAGE_MAX_WIDTH - IMAGE_MIN_WIDTH)) +
    IMAGE_MIN_WIDTH
  }px`;
  img.style.maxHeight = `${IMAGE_MAX_HEIGHT}px`;
  setTimeout(function () {
    img.classList.add("arena-screensaver-animated");
    img.classList.add("arena-screensaver-fade-in-up");
  }, index * timeBetween);
  return img;
};

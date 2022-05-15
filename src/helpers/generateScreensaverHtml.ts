import { Image } from "../types";
import { imagesToHtml } from "./imagesToHtml";

export const ANIMATION_DURATION = 1;

export const generateScreensaverHtml = (
  images: Image[],
  timeBetween: number
) => {
  const htmlImages = imagesToHtml(images, timeBetween);
  const div = document.createElement("div");
  div.id = "arena-screensaver-background";
  div.classList.add("screensaver-background");
  div.classList.add("animated");
  div.classList.add("fade-in");

  htmlImages.forEach((image) => div.appendChild(image));

  return div;
};

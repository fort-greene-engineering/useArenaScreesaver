import { imageToHtml } from "./imageToHtml";
export const imagesToHtml = (images, timeBetween) => {
    return images.map((image, index) => imageToHtml(image, index, timeBetween));
};
//# sourceMappingURL=imagesToHtml.js.map
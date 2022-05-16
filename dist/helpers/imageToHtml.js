export const IMAGE_MAX_WIDTH = 500;
export const IMAGE_MIN_WIDTH = 200;
export const imageToHtml = (image, index, timeBetween) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add("screensaver-image");
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${Math.random() * (window.innerHeight - IMAGE_MAX_WIDTH)}px`;
    img.style.width = `${Math.floor(Math.random() * IMAGE_MAX_WIDTH - IMAGE_MIN_WIDTH) +
        IMAGE_MIN_WIDTH}px`;
    setTimeout(function () {
        img.classList.add("animated");
        img.classList.add("fade-in-up");
    }, index * timeBetween);
    return img;
};
//# sourceMappingURL=imageToHtml.js.map
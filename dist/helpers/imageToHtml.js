export const MARGIN = 300;
export const imageToHtml = (image, index, timeBetween) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add("screensaver-image");
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${Math.random() * (window.innerHeight - MARGIN)}px`;
    img.style.width = `${Math.random() * 300 + 200}px`;
    setTimeout(function () {
        img.classList.add("animated");
        img.classList.add("fade-in-up");
    }, index * timeBetween);
    return img;
};
//# sourceMappingURL=imageToHtml.js.map
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const react_idle_timer_1 = require("react-idle-timer");
const react_1 = require("react");
const MARGIN = 300;
const ANIMATION_DURATION = 1;
const formatImage = (image) => {
    if (image.source === null) {
        return {
            id: image.id,
            alt: image.description,
            src: image.image.display.url,
        };
    }
    else {
        return {
            id: image.id,
            alt: image.description,
            src: image.source.url,
        };
    }
};
const formatImageArray = (images) => {
    return images.map(formatImage);
};
const getChannel = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://api.are.na/v2/channels/${slug}?per=50`);
        const data = yield res.json();
        const { contents } = data;
        const images = contents.filter((content) => content.class === "Image");
        return formatImageArray(images);
    }
    catch (error) {
        // Fail silently
        console.error(error);
    }
});
const imageToHtml = (image, index, timeBetween) => {
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
const imagesToHtml = (images, timeBetween) => {
    return images.map((image, index) => imageToHtml(image, index, timeBetween));
};
const generateScreensaverHtml = (images, timeBetween) => {
    const htmlImages = imagesToHtml(images, timeBetween);
    const div = document.createElement("div");
    div.id = "arena-screensaver-background";
    div.classList.add("screensaver-background");
    div.classList.add("animated");
    div.classList.add("fade-in");
    htmlImages.forEach((image) => div.appendChild(image));
    return div;
};
const generateStylesHtml = () => {
    const style = document.createElement("style");
    const css = `
    .screensaver-image {
        position: fixed;
        opacity: 0;
        border-radius: 10px;
    }
    .screensaver-background {
        position: fixed; 
        left: 0; 
        top: 0; 
        width: 100%; 
        height: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    @keyframes fade-in {
        from {}
        to {
            opacity: 1;
        }
    }
    @-webkit-keyframes fade-in {
        from {}
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {}
        to {
            opacity: 0;
        }
    }
    @-webkit-keyframes fade-out {
        from {}
        to {
            opacity: 0;
        }
    }
    @keyframes fade-in-up {
        from {
            transform: translate3d(0,40px,0);
            opacity: 0;
        }
        to {
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }
    @-webkit-keyframes fade-in-up {
        from {
            transform: translate3d(0,40px,0);
            opacity: 0;
        }
        to {
            transform: translate3d(0,0,0);
            opacity: 1;
        }
    }
    .animated {
        animation-duration: ${ANIMATION_DURATION}s;
        animation-fill-mode: both;
        -webkit-animation-duration: 1s;
        -webkit-animation-fill-mode: both
    }
    
    .fade-in-up {
        opacity: 0;
        animation-name: fade-in-up;
        -webkit-animation-name: fade-in-up;
    }
    .fade-in {
        opacity: 0;
        animation-name: fade-in;
        -webkit-animation-name: fade-in;
    }
    .fade-out {
        opacity: 1;
        animation-name: fade-out;
        -webkit-animation-name: fade-out;
    }
    `;
    style.innerText = css;
    return style;
};
const useArenaScreensaver = ({ arenaSlug, timeout = 1000 * 60 * 2, timeBetween = 2000, }) => {
    if (!arenaSlug) {
        throw new Error("arenaSlug is required");
    }
    const styleRef = (0, react_1.useRef)(null);
    const screensaverRef = (0, react_1.useRef)(null);
    const imagesRef = (0, react_1.useRef)(null);
    const addScreensaver = (0, react_1.useCallback)(() => {
        setTimeout(function () {
            if (imagesRef.current !== null) {
                if (styleRef.current === null) {
                    const style = generateStylesHtml();
                    document.head.appendChild(style);
                    styleRef.current = style;
                }
                if (screensaverRef.current === null) {
                    const screensaver = generateScreensaverHtml(imagesRef.current, timeBetween);
                    screensaverRef.current = screensaver;
                    document.body.appendChild(screensaver);
                }
            }
        }, ANIMATION_DURATION * 1000);
    }, [screensaverRef, imagesRef, timeBetween]);
    const onIdle = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (imagesRef.current === null) {
            const channelImages = yield getChannel(arenaSlug);
            if (channelImages) {
                imagesRef.current = channelImages;
            }
        }
        addScreensaver();
    }), [imagesRef, addScreensaver, arenaSlug]);
    const removeScreensaver = (0, react_1.useCallback)(() => {
        if (screensaverRef.current !== null) {
            screensaverRef.current.classList.remove("fade-in");
            screensaverRef.current.classList.add("fade-out");
        }
        setTimeout(function () {
            if (screensaverRef.current) {
                screensaverRef.current.remove();
                screensaverRef.current = null;
            }
            if (styleRef.current) {
                styleRef.current.remove();
                styleRef.current = null;
            }
        }, ANIMATION_DURATION * 1000);
    }, [screensaverRef]);
    const onActive = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield removeScreensaver();
    }), [removeScreensaver]);
    return (0, react_idle_timer_1.useIdleTimer)({ onIdle, onActive, timeout });
};
exports.default = useArenaScreensaver;

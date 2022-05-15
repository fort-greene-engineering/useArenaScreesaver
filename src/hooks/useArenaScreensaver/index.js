"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArenaScreensaver = void 0;
const react_idle_timer_1 = require("react-idle-timer");
const react_1 = require("react");
const helpers_1 = require("../../helpers");
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
                    const style = (0, helpers_1.generateStylesHtml)();
                    document.head.appendChild(style);
                    styleRef.current = style;
                }
                if (screensaverRef.current === null) {
                    const screensaver = (0, helpers_1.generateScreensaverHtml)(imagesRef.current, timeBetween);
                    screensaverRef.current = screensaver;
                    document.body.appendChild(screensaver);
                }
            }
        }, helpers_1.ANIMATION_DURATION * 1000);
    }, [screensaverRef, imagesRef, timeBetween]);
    const onIdle = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (imagesRef.current === null) {
            const channelImages = yield (0, helpers_1.getChannel)(arenaSlug);
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
        }, helpers_1.ANIMATION_DURATION * 1000);
    }, [screensaverRef]);
    const onActive = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield removeScreensaver();
    }), [removeScreensaver]);
    return (0, react_idle_timer_1.useIdleTimer)({ onIdle, onActive, timeout });
};
exports.useArenaScreensaver = useArenaScreensaver;

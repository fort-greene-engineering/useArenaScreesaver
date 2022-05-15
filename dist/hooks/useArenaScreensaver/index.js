var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useIdleTimer } from "react-idle-timer";
import { useRef, useCallback } from "react";
import { ANIMATION_DURATION, generateScreensaverHtml, generateStylesHtml, getChannel, } from "../../helpers";
export const useArenaScreensaver = ({ arenaSlug, timeout = 1000 * 60 * 2, timeBetween = 2000, }) => {
    if (!arenaSlug) {
        throw new Error("arenaSlug is required");
    }
    const styleRef = useRef(null);
    const screensaverRef = useRef(null);
    const imagesRef = useRef(null);
    const addScreensaver = useCallback(() => {
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
    const onIdle = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (imagesRef.current === null) {
            const channelImages = yield getChannel(arenaSlug);
            if (channelImages !== null) {
                imagesRef.current = channelImages;
            }
        }
        addScreensaver();
    }), [imagesRef, addScreensaver, arenaSlug]);
    const removeScreensaver = useCallback(() => {
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
    const onActive = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        yield removeScreensaver();
    }), [removeScreensaver]);
    return useIdleTimer({ onIdle, onActive, timeout });
};
module.exports = { useArenaScreensaver };
//# sourceMappingURL=index.js.map
import { useIdleTimer, IIdleTimer } from "react-idle-timer";
import { useRef, useCallback } from "react";
import { Image } from "../../types";
import {
  ANIMATION_DURATION,
  generateScreensaverHtml,
  generateStylesHtml,
  getChannel,
} from "../../helpers";

export const useArenaScreensaver = ({
  arenaSlug,
  timeout = 1000 * 60 * 2,
  timeBetween = 2000,
}: {
  arenaSlug: string;
  timeout?: number;
  timeBetween?: number;
}): IIdleTimer => {
  if (!arenaSlug) {
    throw new Error("arenaSlug is required");
  }
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const screensaverRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Image[] | null>(null);

  const addScreensaver = useCallback(() => {
    setTimeout(function () {
      if (imagesRef.current !== null) {
        if (styleRef.current === null) {
          const style = generateStylesHtml();
          document.head.appendChild(style);
          styleRef.current = style;
        }
        if (screensaverRef.current === null) {
          const screensaver = generateScreensaverHtml(
            imagesRef.current,
            timeBetween
          );
          screensaverRef.current = screensaver;
          document.body.appendChild(screensaver);
        }
      }
    }, ANIMATION_DURATION * 1000);
  }, [screensaverRef, imagesRef, timeBetween]);

  const onIdle = useCallback(async () => {
    if (imagesRef.current === null) {
      const channelImages = await getChannel(arenaSlug);
      if (channelImages !== null) {
        imagesRef.current = channelImages;
      }
    }
    addScreensaver();
  }, [imagesRef, addScreensaver, arenaSlug]);

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

  const onActive = useCallback(async () => {
    await removeScreensaver();
  }, [removeScreensaver]);

  return useIdleTimer({ onIdle, onActive, timeout });
};

module.exports = {};

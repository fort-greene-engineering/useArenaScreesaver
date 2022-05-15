import { useIdleTimer } from "react-idle-timer";
import { useRef, useCallback } from "react";

interface Image {
  id: string;
  alt: string;
  src: string;
}

const MARGIN = 300;
const ANIMATION_DURATION = 1;

const formatImage = (image: any): Image => {
  if (image.source === null) {
    return {
      id: image.id,
      alt: image.description,
      src: image.image.display.url,
    };
  } else {
    return {
      id: image.id,
      alt: image.description,
      src: image.source.url,
    };
  }
};

const formatImageArray = (images: any[]): Image[] => {
  return images.map(formatImage);
};

const getChannel = async (slug: string) => {
  try {
    const res = await fetch(`https://api.are.na/v2/channels/${slug}?per=50`);
    const data = await res.json();
    const { contents } = data;

    const images = contents.filter((content: any) => content.class === "Image");
    console.log(images);
    return formatImageArray(images);
  } catch (error) {
    // Fail silently
    console.error(error);
  }
};

const imageToHtml = (image: Image, index: number, timeBetween: number) => {
  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt;
  img.classList.add("screensaver-image");
  img.style.left = `${Math.random() * window.innerWidth}px`;
  img.style.top = `${Math.random() * (window.innerHeight - MARGIN)}px`;
  img.style.width = `${Math.random() * 300 + 200}px`;
  setTimeout(() => {
    img.classList.add("animated");
    img.classList.add("fade-in-up");
  }, index * timeBetween);
  return img;
};

const imagesToHtml = (images: Image[], timeBetween: number) => {
  return images.map((image: Image, index: number) =>
    imageToHtml(image, index, timeBetween)
  );
};

const generateScreensaverHtml = (images: Image[], timeBetween: number) => {
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
  const style = `<style>    
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
    </style>`;

  document.head.insertAdjacentHTML("beforeend", style);
};

const useArenaScreensaver = ({
  arenaSlug,
  timeout = 1000 * 60 * 2, // 2 minutes
  timeBetween = 2000,
}: {
  arenaSlug: string;
  timeout: number;
  timeBetween: number;
}) => {
  if (!arenaSlug) {
    throw new Error("arenaSlug is required");
  }
  const screensaverRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Image[] | null>(null);

  const addScreensaver = useCallback(async () => {
    if (imagesRef.current !== null && screensaverRef.current !== null) {
      generateStylesHtml();
      const screensaver = generateScreensaverHtml(
        imagesRef.current,
        timeBetween
      );
      screensaverRef.current = screensaver;
      document.body.appendChild(screensaver);
    }
  }, [screensaverRef, imagesRef, timeBetween]);

  const onIdle = useCallback(async () => {
    if (imagesRef.current === null) {
      const channelImages = await getChannel(arenaSlug);
      if (channelImages) {
        imagesRef.current = channelImages;
      }
    }
    await addScreensaver();
  }, [imagesRef, addScreensaver]);

  const removeScreensaver = useCallback(() => {
    if (screensaverRef.current !== null) {
      screensaverRef.current.classList.remove("fade-in");
      screensaverRef.current.classList.add("fade-out");
    }

    setTimeout(() => {
      if (screensaverRef.current) {
        screensaverRef.current.remove();
      }
    }, ANIMATION_DURATION * 1000);
  }, [screensaverRef]);

  const onActive = useCallback(async () => {
    await removeScreensaver();
  }, [removeScreensaver]);

  return useIdleTimer({ onIdle, onActive, timeout });
};

export default useArenaScreensaver;

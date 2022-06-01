import { ANIMATION_DURATION } from "./generateScreensaverHtml";

export const generateStylesHtml = (backgroundOpacity: number) => {
  const style = document.createElement("style");

  const css = `
      .arena-screensaver-image {
          position: fixed;
          opacity: 0;
          border-radius: 10px;
      }
      .arena-screensaver-background {
          pointer-events: none;
          z-index: 2147483647; /* max */
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%;
          background-color: rgba(0,0,0,${backgroundOpacity});
      }
      @keyframes arena-screensaver-fade-in {
          from {}
          to {
              opacity: 1;
          }
      }
      @-webkit-keyframes arena-screensaver-fade-in {
          from {}
          to {
              opacity: 1;
          }
      }
      @keyframes arena-screensaver-fade-out {
          from {}
          to {
              opacity: 0;
          }
      }
      @-webkit-keyframes arena-screensaver-fade-out {
          from {}
          to {
              opacity: 0;
          }
      }
      @keyframes arena-screensaver-fade-in-up {
          from {
              transform: translate3d(0,40px,0);
              opacity: 0;
          }
          to {
              transform: translate3d(0,0,0);
              opacity: 1
          }
      }
      @-webkit-keyframes arena-screensaver-fade-in-up {
          from {
              transform: translate3d(0,40px,0);
              opacity: 0;
          }
          to {
              transform: translate3d(0,0,0);
              opacity: 1;
          }
      }
      .arena-screensaver-animated {
          animation-duration: ${ANIMATION_DURATION}s;
          animation-fill-mode: both;
          -webkit-animation-duration: 1s;
          -webkit-animation-fill-mode: both
      }
      
      .arena-screensaver-fade-in-up {
          opacity: 0;
          animation-name: arena-screensaver-fade-in-up;
          -webkit-animation-name: arena-screensaver-fade-in-up;
      }
      .arena-screensaver-fade-in {
          opacity: 0;
          animation-name: arena-screensaver-fade-in;
          -webkit-animation-name: arena-screensaver-fade-in;
      }
      .arena-screensaver-fade-out {
          opacity: 1;
          animation-name: arena-screensaver-fade-out;
          -webkit-animation-name: arena-screensaver-fade-out;
      }
      @media screen and (max-width: 768px) {
        .arena-screensaver-background {
            display:none;
        }
        .arena-screensaver-image {
            display:none;
        }
 
      }
      `;
  style.innerText = css;
  return style;
};

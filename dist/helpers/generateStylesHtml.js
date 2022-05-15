import { ANIMATION_DURATION } from "./generateScreensaverHtml";
export const generateStylesHtml = (backgroundOpacity) => {
    const style = document.createElement("style");
    const css = `
      .screensaver-image {
          position: fixed;
          opacity: 0;
          border-radius: 10px;
      }
      .screensaver-background {
          z-index: 2147483647; /* max */
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%;
          background-color: rgba(0,0,0,${backgroundOpacity});
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
//# sourceMappingURL=generateStylesHtml.js.map
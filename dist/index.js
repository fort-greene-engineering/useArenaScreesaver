Object.defineProperty(exports,"__esModule",{value:!0});var reactIdleTimer=require("react-idle-timer"),react=require("react");function __awaiter(e,s,o,c){return new(o=o||Promise)(function(r,a){function n(e){try{i(c.next(e))}catch(e){a(e)}}function t(e){try{i(c.throw(e))}catch(e){a(e)}}function i(e){var a;e.done?r(e.value):((a=e.value)instanceof o?a:new o(function(e){e(a)})).then(n,t)}i((c=c.apply(e,s||[])).next())})}const IMAGE_MAX_WIDTH=500,IMAGE_MIN_WIDTH=200,IMAGE_MAX_HEIGHT=700,imageToHtml=(e,a,r)=>{const n=document.createElement("img");return n.src=e.src,n.alt=e.alt,n.classList.add("arena-screensaver-image"),n.style.left=Math.floor(Math.random()*(window.innerWidth-IMAGE_MAX_WIDTH))+"px",n.style.top=Math.floor(Math.random()*(window.innerHeight-IMAGE_MAX_HEIGHT/2))+"px",n.style.width=Math.floor(Math.random()*(IMAGE_MAX_WIDTH-IMAGE_MIN_WIDTH))+IMAGE_MIN_WIDTH+"px",n.style.maxHeight=IMAGE_MAX_HEIGHT+"px",setTimeout(function(){n.classList.add("arena-screensaver-animated"),n.classList.add("arena-screensaver-fade-in-up")},a*r),n},imagesToHtml=(e,r)=>e.map((e,a)=>imageToHtml(e,a,r)),ANIMATION_DURATION=1,generateScreensaverHtml=(e,a)=>{const r=imagesToHtml(e,a),n=document.createElement("div");return n.id="arena-screensaver-background",n.classList.add("arena-screensaver-background"),n.classList.add("arena-screensaver-animated"),n.classList.add("arena-screensaver-fade-in"),r.forEach(e=>n.appendChild(e)),n},generateStylesHtml=e=>{const a=document.createElement("style");e=`
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
          background-color: rgba(0,0,0,${e});
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
      `;return a.innerText=e,a},formatImage=e=>null===e.source?{id:e.id,alt:e.description,src:e.image.display.url}:{id:e.id,alt:e.description,src:e.source.url},formatImageArray=e=>e.map(formatImage),getChannel=e=>__awaiter(void 0,void 0,void 0,function*(){return fetch(`https://api.are.na/v2/channels/${e}?per=50`).then(e=>e.json().then(e=>{const a=e["contents"];e=a.filter(e=>"Image"===e.class);return formatImageArray(e)}).catch(e=>null)).catch(e=>null)}),useArenaScreensaver=({arenaSlug:a,timeout:e=12e4,timeBetween:r=2e3,backgroundOpacity:n=.4})=>{if(!a)throw new Error("arenaSlug is required");const t=react.useRef(null),i=react.useRef(null),s=react.useRef(null),o=react.useCallback(()=>{setTimeout(function(){var e;null!==s.current&&(null===t.current&&(e=generateStylesHtml(n),document.head.appendChild(e),t.current=e),null===i.current&&(e=generateScreensaverHtml(s.current,r),i.current=e,document.body.appendChild(e)))},1e3*ANIMATION_DURATION)},[i,s,r]);var c=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){var e;null===s.current&&null!==(e=yield getChannel(a))&&(s.current=e),o()}),[s,o,a]);const l=react.useCallback(()=>{null!==i.current&&(i.current.classList.remove("arena-screensaver-fade-in"),i.current.classList.add("arena-screensaver-fade-out")),setTimeout(function(){i.current&&(i.current.remove(),i.current=null),t.current&&(t.current.remove(),t.current=null)},1e3*ANIMATION_DURATION)},[i]);var d=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){yield l()}),[l]);return reactIdleTimer.useIdleTimer({onIdle:c,onActive:d,timeout:e})};exports.useArenaScreensaver=useArenaScreensaver;
//# sourceMappingURL=index.js.map

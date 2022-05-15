Object.defineProperty(exports,"__esModule",{value:!0});var reactIdleTimer=require("react-idle-timer"),react=require("react");function __awaiter(e,o,c,s){return new(c=c||Promise)(function(a,t){function r(e){try{i(s.next(e))}catch(e){t(e)}}function n(e){try{i(s.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?a(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(r,n)}i((s=s.apply(e,o||[])).next())})}const MARGIN=300,imageToHtml=(e,t,a)=>{const r=document.createElement("img");return r.src=e.src,r.alt=e.alt,r.classList.add("screensaver-image"),r.style.left=Math.random()*window.innerWidth+"px",r.style.top=Math.random()*(window.innerHeight-MARGIN)+"px",r.style.width=300*Math.random()+200+"px",setTimeout(function(){r.classList.add("animated"),r.classList.add("fade-in-up")},t*a),r},imagesToHtml=(e,a)=>e.map((e,t)=>imageToHtml(e,t,a)),ANIMATION_DURATION=1,generateScreensaverHtml=(e,t)=>{const a=imagesToHtml(e,t),r=document.createElement("div");return r.id="arena-screensaver-background",r.classList.add("screensaver-background"),r.classList.add("animated"),r.classList.add("fade-in"),a.forEach(e=>r.appendChild(e)),r},generateStylesHtml=()=>{const e=document.createElement("style");var t=`
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
      `;return e.innerText=t,e},formatImage=e=>null===e.source?{id:e.id,alt:e.description,src:e.image.display.url}:{id:e.id,alt:e.description,src:e.source.url},formatImageArray=e=>e.map(formatImage),getChannel=r=>__awaiter(void 0,void 0,void 0,function*(){try{const t=yield fetch(`https://api.are.na/v2/channels/${r}?per=50`);const a=(yield t.json())["contents"];var e=a.filter(e=>"Image"===e.class);return formatImageArray(e)}catch(e){console.error(e)}}),useArenaScreensaver=({arenaSlug:t,timeout:e=12e4,timeBetween:a=2e3})=>{if(!t)throw new Error("arenaSlug is required");const r=react.useRef(null),n=react.useRef(null),i=react.useRef(null),o=react.useCallback(()=>{setTimeout(function(){var e;null!==i.current&&(null===r.current&&(e=generateStylesHtml(),document.head.appendChild(e),r.current=e),null===n.current&&(e=generateScreensaverHtml(i.current,a),n.current=e,document.body.appendChild(e)))},1e3*ANIMATION_DURATION)},[n,i,a]);var c=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){var e;null===i.current&&(e=yield getChannel(t))&&(i.current=e),o()}),[i,o,t]);const s=react.useCallback(()=>{null!==n.current&&(n.current.classList.remove("fade-in"),n.current.classList.add("fade-out")),setTimeout(function(){n.current&&(n.current.remove(),n.current=null),r.current&&(r.current.remove(),r.current=null)},1e3*ANIMATION_DURATION)},[n]);var d=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){yield s()}),[s]);return reactIdleTimer.useIdleTimer({onIdle:c,onActive:d,timeout:e})};exports.useArenaScreensaver=useArenaScreensaver;
//# sourceMappingURL=index.js.map

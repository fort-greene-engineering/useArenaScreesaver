Object.defineProperty(exports,"__esModule",{value:!0});var reactIdleTimer=require("react-idle-timer"),react=require("react");function __awaiter(e,o,c,s){return new(c=c||Promise)(function(t,a){function n(e){try{i(s.next(e))}catch(e){a(e)}}function r(e){try{i(s.throw(e))}catch(e){a(e)}}function i(e){var a;e.done?t(e.value):((a=e.value)instanceof c?a:new c(function(e){e(a)})).then(n,r)}i((s=s.apply(e,o||[])).next())})}const MARGIN=300,imageToHtml=(e,a,t)=>{const n=document.createElement("img");return n.src=e.src,n.alt=e.alt,n.classList.add("screensaver-image"),n.style.left=Math.random()*window.innerWidth+"px",n.style.top=Math.random()*(window.innerHeight-MARGIN)+"px",n.style.width=300*Math.random()+200+"px",setTimeout(function(){n.classList.add("animated"),n.classList.add("fade-in-up")},a*t),n},imagesToHtml=(e,t)=>e.map((e,a)=>imageToHtml(e,a,t)),ANIMATION_DURATION=1,generateScreensaverHtml=(e,a)=>{const t=imagesToHtml(e,a),n=document.createElement("div");return n.id="arena-screensaver-background",n.classList.add("screensaver-background"),n.classList.add("animated"),n.classList.add("fade-in"),t.forEach(e=>n.appendChild(e)),n},generateStylesHtml=e=>{const a=document.createElement("style");e=`
      .screensaver-image {
          position: fixed;
          z-index: 2147483647; // maximum z-index to ensure screensaver is always on top
          opacity: 0;
          border-radius: 10px;
      }
      .screensaver-background {
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%;
          background-color: rgba(0,0,0,${e});
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
      `;return a.innerText=e,a},formatImage=e=>null===e.source?{id:e.id,alt:e.description,src:e.image.display.url}:{id:e.id,alt:e.description,src:e.source.url},formatImageArray=e=>e.map(formatImage),getChannel=e=>__awaiter(void 0,void 0,void 0,function*(){return fetch(`https://api.are.na/v2/channels/${e}?per=50`).then(e=>e.json().then(e=>{const a=e["contents"];e=a.filter(e=>"Image"===e.class);return formatImageArray(e)}).catch(e=>null)).catch(e=>null)}),useArenaScreensaver=({arenaSlug:a,timeout:e=12e4,timeBetween:t=2e3,backgroundOpacity:n=.4})=>{if(!a)throw new Error("arenaSlug is required");const r=react.useRef(null),i=react.useRef(null),o=react.useRef(null),c=react.useCallback(()=>{setTimeout(function(){var e;null!==o.current&&(null===r.current&&(e=generateStylesHtml(n),document.head.appendChild(e),r.current=e),null===i.current&&(e=generateScreensaverHtml(o.current,t),i.current=e,document.body.appendChild(e)))},1e3*ANIMATION_DURATION)},[i,o,t]);var s=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){var e;null===o.current&&null!==(e=yield getChannel(a))&&(o.current=e),c()}),[o,c,a]);const u=react.useCallback(()=>{null!==i.current&&(i.current.classList.remove("fade-in"),i.current.classList.add("fade-out")),setTimeout(function(){i.current&&(i.current.remove(),i.current=null),r.current&&(r.current.remove(),r.current=null)},1e3*ANIMATION_DURATION)},[i]);var d=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){yield u()}),[u]);return reactIdleTimer.useIdleTimer({onIdle:s,onActive:d,timeout:e})};module.exports={useArenaScreensaver:useArenaScreensaver},exports.useArenaScreensaver=useArenaScreensaver;
//# sourceMappingURL=index.js.map

Object.defineProperty(exports,"__esModule",{value:!0});var reactIdleTimer=require("react-idle-timer"),react=require("react");function __awaiter(e,o,c,s){return new(c=c||Promise)(function(a,t){function n(e){try{i(s.next(e))}catch(e){t(e)}}function r(e){try{i(s.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?a(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(n,r)}i((s=s.apply(e,o||[])).next())})}const IMAGE_MAX_WIDTH=500,IMAGE_MIN_WIDTH=200,imageToHtml=(e,t,a)=>{const n=document.createElement("img");return n.src=e.src,n.alt=e.alt,n.classList.add("screensaver-image"),n.style.left=Math.random()*window.innerWidth+"px",n.style.top=Math.random()*(window.innerHeight-IMAGE_MAX_WIDTH)+"px",n.style.width=Math.floor(Math.random()*IMAGE_MAX_WIDTH-IMAGE_MIN_WIDTH)+IMAGE_MIN_WIDTH+"px",setTimeout(function(){n.classList.add("animated"),n.classList.add("fade-in-up")},t*a),n},imagesToHtml=(e,a)=>e.map((e,t)=>imageToHtml(e,t,a)),ANIMATION_DURATION=1,generateScreensaverHtml=(e,t)=>{const a=imagesToHtml(e,t),n=document.createElement("div");return n.id="arena-screensaver-background",n.classList.add("screensaver-background"),n.classList.add("animated"),n.classList.add("fade-in"),a.forEach(e=>n.appendChild(e)),n},generateStylesHtml=e=>{const t=document.createElement("style");e=`
      .screensaver-image {
          position: fixed;
          opacity: 0;
          border-radius: 10px;
      }
      .screensaver-background {
          pointer-events: none;
          z-index: 2147483647; /* max */
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
      `;return t.innerText=e,t},formatImage=e=>null===e.source?{id:e.id,alt:e.description,src:e.image.display.url}:{id:e.id,alt:e.description,src:e.source.url},formatImageArray=e=>e.map(formatImage),getChannel=e=>__awaiter(void 0,void 0,void 0,function*(){return fetch(`https://api.are.na/v2/channels/${e}?per=50`).then(e=>e.json().then(e=>{const t=e["contents"];e=t.filter(e=>"Image"===e.class);return formatImageArray(e)}).catch(e=>null)).catch(e=>null)}),useArenaScreensaver=({arenaSlug:t,timeout:e=12e4,timeBetween:a=2e3,backgroundOpacity:n=.4})=>{if(!t)throw new Error("arenaSlug is required");const r=react.useRef(null),i=react.useRef(null),o=react.useRef(null),c=react.useCallback(()=>{setTimeout(function(){var e;null!==o.current&&(null===r.current&&(e=generateStylesHtml(n),document.head.appendChild(e),r.current=e),null===i.current&&(e=generateScreensaverHtml(o.current,a),i.current=e,document.body.appendChild(e)))},1e3*ANIMATION_DURATION)},[i,o,a]);var s=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){var e;null===o.current&&null!==(e=yield getChannel(t))&&(o.current=e),c()}),[o,c,t]);const u=react.useCallback(()=>{null!==i.current&&(i.current.classList.remove("fade-in"),i.current.classList.add("fade-out")),setTimeout(function(){i.current&&(i.current.remove(),i.current=null),r.current&&(r.current.remove(),r.current=null)},1e3*ANIMATION_DURATION)},[i]);var d=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){yield u()}),[u]);return reactIdleTimer.useIdleTimer({onIdle:s,onActive:d,timeout:e})};module.exports={useArenaScreensaver:useArenaScreensaver},exports.useArenaScreensaver=useArenaScreensaver;
//# sourceMappingURL=index.js.map

Object.defineProperty(exports,"__esModule",{value:!0});var reactIdleTimer=require("react-idle-timer"),react=require("react");function __awaiter(e,o,c,s){return new(c=c||Promise)(function(a,t){function n(e){try{i(s.next(e))}catch(e){t(e)}}function r(e){try{i(s.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?a(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(n,r)}i((s=s.apply(e,o||[])).next())})}const MARGIN=300,imageToHtml=(e,t,a)=>{const n=document.createElement("img");return n.src=e.src,n.alt=e.alt,n.classList.add("screensaver-image"),n.style.left=Math.random()*window.innerWidth+"px",n.style.top=Math.random()*(window.innerHeight-MARGIN)+"px",n.style.width=300*Math.random()+200+"px",setTimeout(function(){n.classList.add("animated"),n.classList.add("fade-in-up")},t*a),n},imagesToHtml=(e,a)=>e.map((e,t)=>imageToHtml(e,t,a)),ANIMATION_DURATION=1,generateScreensaverHtml=(e,t)=>{const a=imagesToHtml(e,t),n=document.createElement("div");return n.id="arena-screensaver-background",n.classList.add("screensaver-background"),n.classList.add("animated"),n.classList.add("fade-in"),a.forEach(e=>n.appendChild(e)),n},generateStylesHtml=()=>{const e=document.createElement("style");var t=`
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
      `;return e.innerText=t,e},formatImage=e=>null===e.source?{id:e.id,alt:e.description,src:e.image.display.url}:{id:e.id,alt:e.description,src:e.source.url},formatImageArray=e=>e.map(formatImage),getChannel=e=>__awaiter(void 0,void 0,void 0,function*(){return fetch(`https://api.are.na/v2/channels/${e}?per=50`).then(e=>e.json().then(e=>{const t=e["contents"];e=t.filter(e=>"Image"===e.class);return formatImageArray(e)}).catch(e=>null)).catch(e=>null)}),useArenaScreensaver=({arenaSlug:t,timeout:e=12e4,timeBetween:a=2e3})=>{if(!t)throw new Error("arenaSlug is required");const n=react.useRef(null),r=react.useRef(null),i=react.useRef(null),o=react.useCallback(()=>{setTimeout(function(){var e;null!==i.current&&(null===n.current&&(e=generateStylesHtml(),document.head.appendChild(e),n.current=e),null===r.current&&(e=generateScreensaverHtml(i.current,a),r.current=e,document.body.appendChild(e)))},1e3*ANIMATION_DURATION)},[r,i,a]);var c=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){var e;null===i.current&&null!==(e=yield getChannel(t))&&(i.current=e),o()}),[i,o,t]);const s=react.useCallback(()=>{null!==r.current&&(r.current.classList.remove("fade-in"),r.current.classList.add("fade-out")),setTimeout(function(){r.current&&(r.current.remove(),r.current=null),n.current&&(n.current.remove(),n.current=null)},1e3*ANIMATION_DURATION)},[r]);var u=react.useCallback(()=>__awaiter(void 0,void 0,void 0,function*(){yield s()}),[s]);return reactIdleTimer.useIdleTimer({onIdle:c,onActive:u,timeout:e})};module.exports={},exports.useArenaScreensaver=useArenaScreensaver;
//# sourceMappingURL=index.js.map

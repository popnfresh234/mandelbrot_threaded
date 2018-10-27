!function(n){var t={};function e(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return n[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,a){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:a})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(a,o,function(t){return n[t]}.bind(null,o));return a},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t){function e(n,t,e){return(n-t)/e}function a(n,t,e){return(n-t)/e}function o(n,t,e){return n+(t-n)*e}n.exports={calcRealFactor:e,calcImaginaryFactor:a,handleZoom:function(n,t,r,i,c,m,l,s){let u=r,g=i;n.preventDefault();const f=e(g.maxReal,g.minReal,c),y=a(g.maxImaginary,g.minImaginary,m);return{currentDimens:g=function(n,t,e,a){const r=a,i=1/e;r.minReal=o(n,r.minReal,i),r.maxReal=o(n,r.maxReal,i),r.minImaginary=o(t,r.minImaginary,i),r.maxImaginary=o(t,r.maxImaginary,i);const c=(r.minReal+r.maxReal)/2-n,m=(r.minImaginary+r.maxImaginary)/2-t;return r.minReal-=c,r.maxReal-=c,r.minImaginary-=m,r.maxImaginary-=m,r}(g.minReal+(n.clientX-l)*f,g.minImaginary+(n.clientY-s)*y,u*=t,g),zoomFactor:r}}}},function(n,t,e){n.exports=function(){return new Worker(e.p+"ae2c12d3e5c1ec0f53f8.worker.js")}},function(n,t,e){"use strict";e.r(t);var a=e(1),o=e.n(a),r=e(0),i=e.n(r);const c=6,m=1e3,l=256,s=window.innerWidth,u=window.innerHeight,g={minReal:-2,maxReal:1.3,minImaginary:-1.4,maxImaginary:1.5},f=.02;let y=1,d={};const h=2048,I=[{r:0,g:7,b:100},{r:32,g:107,b:203},{r:237,g:255,b:255},{r:255,g:170,b:0},{r:0,g:2,b:0}];let p=I.slice(),x=[];const b=document.getElementById("canvas");b.width=s,b.height=u;const R=b.offsetLeft,w=b.offsetTop,E=b.getContext("2d");function M(n){let{minReal:t,maxReal:e,minImaginary:a,maxImaginary:r}=n;x=function(n,t){const e=function(n,t){let e=n.length;const{length:a}=n;if(a!==t.length)throw new Error("Need an equal count of xs and ys.");if(0===a)return function(){return 0};if(1===a){const n=+t[0];return function(){return n}}const o=[];for(e=0;e<a;e++)o.push(e);o.sort((t,e)=>n[t]<n[e]?-1:1);const r=n,i=t;for(n=[],t=[],e=0;e<a;e++)n.push(+r[o[e]]),t.push(+i[o[e]]);const c=[],m=[],l=[];for(e=0;e<a-1;e++){const a=n[e+1]-n[e],o=t[e+1]-t[e];m.push(a),c.push(o),l.push(o/a)}const s=[l[0]];for(e=0;e<m.length-1;e++){const n=l[e],t=l[e+1];if(n*t<=0)s.push(0);else{const a=m[e],o=m[e+1],r=a+o;s.push(3*r/((r+o)/n+(r+a)/t))}}s.push(l[l.length-1]);const u=[],g=[];for(e=0;e<s.length-1;e++){const n=s[e],t=l[e],a=1/m[e],o=n+s[e+1]-t-t;u.push((t-n-o)*a),g.push(o*a*a)}return function(e){let a=n.length-1;if(e===n[a])return t[a];let o,r=0,i=g.length-1;for(;r<=i;){o=Math.floor(.5*(r+i));const a=n[o];if(a<e)r=o+1;else{if(!(a>e))return t[o];i=o-1}}a=Math.max(0,i);const c=e-n[a],m=c*c;return t[a]+s[a]*c+u[a]*m+g[a]*c*m}};function a(t,e){for(let a=0;a<1;a+=1/n){const n=e(a);t.push(n)}}const o=[],r=[],i=[];a(o,e([0,.16,.42,.6425,.8575],[t[0].r,t[1].r,t[2].r,t[3].r,t[4].r])),a(r,e([0,.16,.42,.6425,.8575],[t[0].g,t[1].g,t[2].g,t[3].g,t[4].g])),a(i,e([0,.16,.42,.6425,.8575],[t[0].b,t[1].b,t[2].b,t[3].b,t[4].b]));const c=[];for(let n=0;n<i.length;n++)c.push(`rgb(${o[n]},${r[n]},${i[n]})`);return c}(h,p);const g=Math.abs(n.maxReal-n.minReal)/Math.abs(n.maxImaginary-n.minImaginary),f=s/u;if(f>g){const n=f/g;t*=n,e*=n}else{const n=g/f;a*=n,r*=n}const y=i.a.calcRealFactor(e,t,s),I=i.a.calcImaginaryFactor(r,a,u),b=function(n){const{points:o}=n.data;for(let t=0;t<o.length;t++){const{y:e,fillStyle:a}=o[t];E.fillStyle=a,E.fillRect(n.data.x,e,1,1)}let i=n.data.x;(i+=c)<s&&this.postMessage({MAX_ITERATIONS:m,BAILOUT_RADIUS:l,x:i,CANVAS_HEIGHT:u,colorArray:x,realFactor:y,imaginaryFactor:I,minReal:t,maxReal:e,minImaginary:a,maxImaginary:r})};for(let n=0;n<c;n++){const i=new o.a;i.postMessage({MAX_ITERATIONS:m,BAILOUT_RADIUS:l,x:n,CANVAS_HEIGHT:u,colorArray:x,realFactor:y,imaginaryFactor:I,minReal:t,maxReal:e,minImaginary:a,maxImaginary:r}),i.onmessage=b}!function(n){const t={0:()=>document.getElementById("minReal"),1:()=>document.getElementById("maxReal"),2:()=>document.getElementById("minImag"),3:()=>document.getElementById("maxImag")};for(let e=0;e<Object.keys(n).length;e++){const a=t[e];a&&(a().textContent=n[Object.keys(n)[e]])}}(d)}const j=document.getElementsByTagName("body")[0];j.addEventListener("click",n=>{const t=i.a.handleZoom(n,1.5,y,d,s,u,R,w);({currentDimens:d,zoomFactor:y}=t),M(d)}),j.addEventListener("contextmenu",n=>{const t=i.a.handleZoom(n,1/1.5,y,d,s,u,R,w);({currentDimens:d,zoomFactor:y}=t),M(d)});const v=document.getElementsByClassName("block");for(let n=0;n<v.length;n++){v[n].addEventListener("click",n=>{n.stopPropagation()})}window.updateColor=function(n,t){const[e,a,o]=n.rgb.map(n=>Math.round(n));p[t]={r:e,g:a,b:o},M(d),document.getElementsByClassName("jscolor")[t].jscolor.hide()},window.pan=function(n,t){n.stopPropagation(),function(n){const t=Math.min(Math.abs(d.minImaginary*f),Math.abs(d.maxImaginary*f)),e={0:()=>{d.minImaginary+=t,d.maxImaginary+=t},1:()=>{d.minReal+=t,d.maxReal+=t},2:()=>{d.minImaginary-=t,d.maxImaginary-=t},4:()=>{d.minReal-=t,d.maxReal-=t}}[n];e&&(e(),M(d))}(t)},window.reset=(()=>{d={...g},p=I.slice();const n=document.getElementsByClassName("jscolor");for(let t=0;t<n.length;t++){n[t].jscolor.fromRGB(p[t].r,p[t].g,p[t].b)}M(d)}),M(d={...g})}]);
//# sourceMappingURL=bundle.js.map
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){onmessage=function(t){!function(t){const e=[];for(let n=0;n<t.CANVAS_HEIGHT;n++){const o=t.minReal+t.x*t.realFactor,r=t.minImaginary+n*t.imaginaryFactor;let a=0,i=0,l=0;for(;a*a+i*i<=t.options.escapeRadius&&l<t.options.iterations;){const t=2*a*i+r;a=a*a-i*i+o,i=t,l++}if(l===t.options.iterations)e.push({y:n,fillStyle:"black"});else{const o=Math.sqrt(a*a+i*i),r=1*Math.log(1*Math.log(o)/Math.log(2))/Math.log(2),u=parseInt((256*Math.sqrt(l+1-r)-250)%t.colorArray.length,10),c=t.colorArray[u];e.push({y:n,fillStyle:c})}}postMessage({x:t.x,points:e})}(t.data)}}]);
//# sourceMappingURL=4754bcdf690e26961eec.worker.js.map
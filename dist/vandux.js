!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.vandux=t():e.vandux=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}({13:function(e,t,r){"use strict";function n(e){var t=e.reducer,r=e.initialState,n={};return n.makeStore=function(){var e=o.default(),c={},a=window.location.search.indexOf("vandux-debug")>-1,i=function(o,c){var i=t(r,{type:"INIT"});e.setState(i),a&&u.default(c,"INIT",r),o(i,c,"INIT",n.createdStore)};return{subscribe:function(e,t){c.hasOwnProperty.call(c,e)||(c[e]=[]),c[e].push(t)},unSubscribe:function(e){delete c[e]},connect:function(e,t,r){return e.forEach(function(e){n.createdStore.subscribe(e,function(o){a&&u.default(t,e,o),r(o,t,e,n.createdStore)})}),i(r,t),{publish:n.createdStore.publish,subscribe:n.createdStore.subscribe,unSubscribe:n.createdStore.unSubscribe,getState:n.createdStore.getState}},publish:function(r,n){if(!c.hasOwnProperty.call(c,r))return!1;e.setState(t(e.state,{type:r,data:n})),c[r].forEach(function(t){t(e.state)})},getState:function(){return e.state}}},n.createdStore=n.makeStore(),n.createdStore}Object.defineProperty(t,"__esModule",{value:!0});var o=r(14),u=r(15);t.createStore=n},14:function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++){t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){void 0===e&&(e={});var t=e;return{setState:function(e){t=n({},t,e)},get state(){return t}}}},15:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var n=Object.keys(e.attributes).map(function(t){return e.attributes[t].value}).join(",");console.log(n,t,r)}}})});
var vandux=function(t){function e(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return t[n].call(u.exports,u,u.exports,e),u.l=!0,u.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function u(t){var e=t.reducer,r=t.initialState,n={};return n.makeStore=function(){var t=(0,a.default)(),u={},o=window.location.search.indexOf("vandux-debug")>-1,c=function(u,a){var c=e(r,{type:"INIT"});t.setState(c),o&&(0,i.default)(a,"INIT",r),u&&u(c,a,"INIT",n.createdStore)};return{getState:function(){return t.state},subscribe:function(t,e){u.hasOwnProperty.call(u,t)||(u[t]=[]);var r=u[t].push(e)-1;return{unsubscribe:function(){return delete u[t][r]}}},connect:function(t,e,r){return t.forEach(function(t){n.createdStore.subscribe(t,function(u){o&&(0,i.default)(e,t,u),r&&r(u,e,t,n.createdStore)})}),c(r,e),n.createdStore},publish:function(r,n){u.hasOwnProperty.call(u,r)&&(t.setState(e(t.state,{type:r,data:n})),u[r].forEach(function(e){return e(void 0!==t.state?t.state:{})}))}}},n.createdStore=n.makeStore(),n.createdStore}Object.defineProperty(e,"__esModule",{value:!0}),e.createStore=u;var o=r(1),a=n(o),c=r(2),i=n(c);e.default={createStore:u}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t;return{setState:function(t){e=n({},e,t)},get state(){return e}}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,r){var n=Object.keys(t.attributes).map(function(e){return t.attributes[e].value}).join(",");console.log(n,e,r)}}]);
// { "framework": "Vue"} 

!function(e){function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}var n={};o.m=e,o.c=n,o.i=function(e){return e},o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="",o(o.s=167)}({167:function(e,o,n){"use strict";function t(e){var o=weex.config.bundleUrl;console.log("eex.config="+JSON.stringify(weex.config));var n;if(r())console.log("isAndroid"),n="file://assets/dist/";else if(i())console.log("isiOS"),n=o.substring(0,o.lastIndexOf("/")+1);else{console.log("web");var t="localhost:8080",c=/\/\/([^\/]+?)\//.exec(o);c&&c.length>=2&&(t=c[1]),n="http://"+t+"//build/"}console.log("nativeBase="+n);var f=n;return"object"===("undefined"==typeof window?"undefined":s(window))&&(f="./weex.html?page=./dist/web/"),console.log("getPlatform()="+l()),console.log("base="+f),f}function r(){return"Android"==l()||"android"==l()}function i(){return console.log("iOS"==l()),"iOS"==l()}function c(){return console.log("Web"==l()),"Web"==l()}function l(){return weex.config.env?weex.config.env.platform:weex.config.platform}function f(){return weex.config.deviceWidth}function u(){return weex.config.deviceHeight}Object.defineProperty(o,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};o.getBaseURL=t,o.isAndroid=r,o.isiOS=i,o.isWeb=c,o.getPlatform=l,o.getScreenWidth=f,o.getScreenHeight=u}});
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.ReactResizeableArea=t(require("react")):e.ReactResizeableArea=t(e.React)}("undefined"!=typeof self?self:this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function o(e){if(p===clearTimeout)return clearTimeout(e);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function a(){m&&h&&(m=!1,h.length?d=h.concat(d):y=-1,d.length&&u())}function u(){if(!m){var e=i(a);m=!0;for(var t=d.length;t;){for(h=d,d=[];++y<t;)h&&h[y].run();y=-1,t=d.length}h=null,m=!1,o(e)}}function c(e,t){this.fun=e,this.array=t}function s(){}var l,p,f=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(e){p=r}}();var h,d=[],m=!1,y=-1;f.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];d.push(new c(e,t)),1!==d.length||m||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=s,f.addListener=s,f.once=s,f.off=s,f.removeListener=s,f.removeAllListeners=s,f.emit=s,f.prependListener=s,f.prependOnceListener=s,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(e,t,n){"use strict";function r(e){return function(){return e}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(e){return e},e.exports=i},function(e,t,n){"use strict";(function(t){function n(e,t,n,i,o,a,u,c){if(r(t),!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,i,o,a,u,c],p=0;s=new Error(t.replace(/%s/g,function(){return l[p++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var r=function(e){};"production"!==t.env.NODE_ENV&&(r=function(e){if(void 0===e)throw new Error("invariant requires an error message argument")}),e.exports=n}).call(t,n(0))},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";(function(t){var r=n(1),i=r;if("production"!==t.env.NODE_ENV){var o=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var i=0,o="Warning: "+e.replace(/%s/g,function(){return n[i++]});"undefined"!=typeof console&&console.error(o);try{throw new Error(o)}catch(e){}};i=function(e,t){if(void 0===t)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==t.indexOf("Failed Composite propType: ")&&!e){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];o.apply(void 0,[t].concat(r))}}}e.exports=i}).call(t,n(0))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.ResizableArea=void 0;var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(6),l=r(s),p=n(7),f=r(p),h=t.ResizableArea=function(e){function t(){var e,n,r,a;i(this,t);for(var c=arguments.length,s=Array(c),l=0;l<c;l++)s[l]=arguments[l];return n=r=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.state={width:u({},r.props.initWidth,{tempPx:0}),height:u({},r.props.initHeight,{tempPx:0})},r.mapSizeOptionToCSS=function(e){var t=e.px,n=e.tempPx,r=e.percent;return"calc("+((t||0)+(n||0))+"px "+(r<0?"-":"+")+" "+Math.abs(r||0)+"%)"},r.calcCurrentSize=function(e){var t=e.width,n=e.height,i=r.props,o=i.maximumWidth,a=i.minimumWidth,u=i.maximumHeight,c=i.minimumHeight,s=i.parentContainer,l=s.getBoundingClientRect(),p=l.width,f=l.height,h=p*o.percent+o.px,d=p*a.percent+a.px,m=p*t.percent+t.px+t.tempPx,y=f*u.percent+u.px,v=f*c.percent+c.px,g=f*n.percent+n.px+n.tempPx,b={width:t,height:n};return m>h&&(b.width=o),m<d&&(b.width=a),g>y&&(b.height=u),g<v&&(b.height=c),b},r.handleDragStartFactory=function(e){return function(t){t.preventDefault();var n=r.props.disable;if(r.handler={width:!n.width&&e.width,height:!n.height&&e.height},r.handler.width||r.handler.height){r.startX=t.clientX,r.startY=t.clientY;var i=r.getCurrentSize();r.startWidth=i.width,r.startHeight=i.height,document.addEventListener("mousemove",r.handleMouseMove),document.addEventListener("mouseup",r.handleMouseUp)}}},r.handleMouseMove=function(e){e.preventDefault();var t=e.clientX-r.startX,n=e.clientY-r.startY,i=u({},r.state),o=i.width,a=i.height;r.handler.width&&(o=u({},o,{tempPx:o.tempPx+t})),r.handler.height&&(a=u({},a,{tempPx:a.tempPx+n})),r.setState(u({},r.state,{curWidth:o,curHeight:a})),r.props.onResizing({width:o,height:a})},r.handleMouseUp=function(e){e.preventDefault(),document.removeEventListener("mousemove",r.handleMouseMove),document.removeEventListener("mouseup",r.handleMouseUp);var t=u({},r.state),n=t.width,i=t.height,o=r.props,a=o.usePercentageResize,c=o.parentContainer,s=c.getBoundingClientRect(),l=s.width,p=s.height;r.handler.width&&(n=a.width?u({},n,{percent:n.percent+n.tempPx/l}):u({},n,{px:n.px+n.tempPx})),r.handler.height&&(i=a.height?u({},i,{percent:i.percent+i.tempPx/p}):u({},i,{px:i.px+i.tempPx}));var f=r.calcCurrentSize({width:n,height:i});r.setState(u({},r.state,{width:u({},f.width,{tempPx:0}),height:u({},f.height,{tempPx:0})})),r.props.onResized(f)},a=n,o(r,a)}return a(t,e),c(t,[{key:"render",value:function(){var e={width:this.mapSizeOptionToCSS(this.state.width),height:this.mapSizeOptionToCSS(this.state.height),maxWidth:this.mapSizeOptionToCSS(this.props.maximumWidth),minWidth:this.mapSizeOptionToCSS(this.props.minimumWidth),maxHeight:this.mapSizeOptionToCSS(this.props.maximumHeight),minHeight:this.mapSizeOptionToCSS(this.props.minimumHeight)};return l.default.createElement("div",{id:this.props.id,className:"resizable-component "+this.props.className,style:e},this.props.children,l.default.createElement("div",{onMouseDown:this.handleDragStartFactory({width:!0,height:!1}),onDoubleClick:this.handleRightDoubleClick,className:"resize-handle-right"}),l.default.createElement("div",{onMouseDown:this.handleDragStartFactory({width:!1,height:!0}),onDoubleClick:this.handleBottomDoubleClick,className:"resize-handle-bottom"}),l.default.createElement("div",{onMouseDown:this.handleDragStartFactory({width:!0,height:!0}),onDoubleClick:this.handleCornerDoubleClick,className:"resize-handle-corner"}))}}]),t}(s.Component);h.propTypes={id:f.default.string,className:f.default.string,children:f.default.node,disable:f.default.shape({width:f.default.bool,height:f.default.bool}),usePercentageResize:f.default.shape({width:f.default.bool,height:f.default.bool}),parentContainer:f.default.node,minimumWidth:f.default.shape({px:f.default.number,percent:f.default.number}),minimumHeight:f.default.shape({px:f.default.number,percent:f.default.number}),maximumWidth:f.default.shape({px:f.default.number,percent:f.default.number}),maximumHeight:f.default.shape({px:f.default.number,percent:f.default.number}),initWidth:f.default.shape({px:f.default.number,percent:f.default.number}),initHeight:f.default.shape({px:f.default.number,percent:f.default.number}),onResizing:f.default.func,onResized:f.default.func},h.defaultProps={disable:{width:!1,height:!1},usePercentageResize:{width:!0,height:!0},parentContainer:document.body,minimumWidth:{px:150,percent:0},minimumHeight:{px:350,percent:0},maximumWidth:{px:0,percent:100},maximumHeight:{px:0,percent:100},initWidth:{px:0,percent:30},initHeight:{px:0,percent:100},onResizing:function(e){return null},onResized:function(e){return null}}},function(t,n){t.exports=e},function(e,t,n){(function(t){if("production"!==t.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,i=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===r};e.exports=n(8)(i,!0)}else e.exports=n(11)()}).call(t,n(0))},function(e,t,n){"use strict";(function(t){var r=n(1),i=n(2),o=n(4),a=n(9),u=n(3),c=n(10);e.exports=function(e,n){function s(e){var t=e&&(j&&e[j]||e[R]);if("function"==typeof t)return t}function l(e,t){return e===t?0!==e||1/e==1/t:e!==e&&t!==t}function p(e){this.message=e,this.stack=""}function f(e){function r(r,s,l,f,h,d,m){if(f=f||N,d=d||l,m!==u)if(n)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==t.env.NODE_ENV&&"undefined"!=typeof console){var y=f+":"+l;!a[y]&&c<3&&(o(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",d,f),a[y]=!0,c++)}return null==s[l]?r?new p(null===s[l]?"The "+h+" `"+d+"` is marked as required in `"+f+"`, but its value is `null`.":"The "+h+" `"+d+"` is marked as required in `"+f+"`, but its value is `undefined`."):null:e(s,l,f,h,d)}if("production"!==t.env.NODE_ENV)var a={},c=0;var s=r.bind(null,!1);return s.isRequired=r.bind(null,!0),s}function h(e){function t(t,n,r,i,o,a){var u=t[n];if(T(u)!==e)return new p("Invalid "+i+" `"+o+"` of type `"+E(u)+"` supplied to `"+r+"`, expected `"+e+"`.");return null}return f(t)}function d(e){function t(t,n,r,i,o){if("function"!=typeof e)return new p("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var a=t[n];if(!Array.isArray(a)){return new p("Invalid "+i+" `"+o+"` of type `"+T(a)+"` supplied to `"+r+"`, expected an array.")}for(var c=0;c<a.length;c++){var s=e(a,c,r,i,o+"["+c+"]",u);if(s instanceof Error)return s}return null}return f(t)}function m(e){function t(t,n,r,i,o){if(!(t[n]instanceof e)){var a=e.name||N;return new p("Invalid "+i+" `"+o+"` of type `"+S(t[n])+"` supplied to `"+r+"`, expected instance of `"+a+"`.")}return null}return f(t)}function y(e){function n(t,n,r,i,o){for(var a=t[n],u=0;u<e.length;u++)if(l(a,e[u]))return null;return new p("Invalid "+i+" `"+o+"` of value `"+a+"` supplied to `"+r+"`, expected one of "+JSON.stringify(e)+".")}return Array.isArray(e)?f(n):("production"!==t.env.NODE_ENV&&o(!1,"Invalid argument supplied to oneOf, expected an instance of array."),r.thatReturnsNull)}function v(e){function t(t,n,r,i,o){if("function"!=typeof e)return new p("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var a=t[n],c=T(a);if("object"!==c)return new p("Invalid "+i+" `"+o+"` of type `"+c+"` supplied to `"+r+"`, expected an object.");for(var s in a)if(a.hasOwnProperty(s)){var l=e(a,s,r,i,o+"."+s,u);if(l instanceof Error)return l}return null}return f(t)}function g(e){function n(t,n,r,i,o){for(var a=0;a<e.length;a++){if(null==(0,e[a])(t,n,r,i,o,u))return null}return new p("Invalid "+i+" `"+o+"` supplied to `"+r+"`.")}if(!Array.isArray(e))return"production"!==t.env.NODE_ENV&&o(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),r.thatReturnsNull;for(var i=0;i<e.length;i++){var a=e[i];if("function"!=typeof a)return o(!1,"Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.",P(a),i),r.thatReturnsNull}return f(n)}function b(e){function t(t,n,r,i,o){var a=t[n],c=T(a);if("object"!==c)return new p("Invalid "+i+" `"+o+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");for(var s in e){var l=e[s];if(l){var f=l(a,s,r,i,o+"."+s,u);if(f)return f}}return null}return f(t)}function w(e){function t(t,n,r,i,o){var c=t[n],s=T(c);if("object"!==s)return new p("Invalid "+i+" `"+o+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");var l=a({},t[n],e);for(var f in l){var h=e[f];if(!h)return new p("Invalid "+i+" `"+o+"` key `"+f+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[n],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var d=h(c,f,r,i,o+"."+f,u);if(d)return d}return null}return f(t)}function x(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(x);if(null===t||e(t))return!0;var n=s(t);if(!n)return!1;var r,i=n.call(t);if(n!==t.entries){for(;!(r=i.next()).done;)if(!x(r.value))return!1}else for(;!(r=i.next()).done;){var o=r.value;if(o&&!x(o[1]))return!1}return!0;default:return!1}}function O(e,t){return"symbol"===e||("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}function T(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":O(t,e)?"symbol":t}function E(e){if(void 0===e||null===e)return""+e;var t=T(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function P(e){var t=E(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}function S(e){return e.constructor&&e.constructor.name?e.constructor.name:N}var j="function"==typeof Symbol&&Symbol.iterator,R="@@iterator",N="<<anonymous>>",_={array:h("array"),bool:h("boolean"),func:h("function"),number:h("number"),object:h("object"),string:h("string"),symbol:h("symbol"),any:function(){return f(r.thatReturnsNull)}(),arrayOf:d,element:function(){function t(t,n,r,i,o){var a=t[n];if(!e(a)){return new p("Invalid "+i+" `"+o+"` of type `"+T(a)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return f(t)}(),instanceOf:m,node:function(){function e(e,t,n,r,i){return x(e[t])?null:new p("Invalid "+r+" `"+i+"` supplied to `"+n+"`, expected a ReactNode.")}return f(e)}(),objectOf:v,oneOf:y,oneOfType:g,shape:b,exact:w};return p.prototype=Error.prototype,_.checkPropTypes=c,_.PropTypes=_,_}}).call(t,n(0))},function(e,t,n){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,u,c=r(e),s=1;s<arguments.length;s++){n=Object(arguments[s]);for(var l in n)o.call(n,l)&&(c[l]=n[l]);if(i){u=i(n);for(var p=0;p<u.length;p++)a.call(n,u[p])&&(c[u[p]]=n[u[p]])}}return c}},function(e,t,n){"use strict";(function(t){function r(e,n,r,c,s){if("production"!==t.env.NODE_ENV)for(var l in e)if(e.hasOwnProperty(l)){var p;try{i("function"==typeof e[l],"%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.",c||"React class",r,l,typeof e[l]),p=e[l](n,l,c,r,null,a)}catch(e){p=e}if(o(!p||p instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",c||"React class",r,l,typeof p),p instanceof Error&&!(p.message in u)){u[p.message]=!0;var f=s?s():"";o(!1,"Failed %s type: %s%s",r,p.message,null!=f?f:"")}}}if("production"!==t.env.NODE_ENV)var i=n(2),o=n(4),a=n(3),u={};e.exports=r}).call(t,n(0))},function(e,t,n){"use strict";var r=n(1),i=n(2),o=n(3);e.exports=function(){function e(e,t,n,r,a,u){u!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=r,n.PropTypes=n,n}}])});
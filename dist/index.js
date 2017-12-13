/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _stateMachine = __webpack_require__(4);\n\nvar _stateMachine2 = _interopRequireDefault(_stateMachine);\n\nvar _eventLogger = __webpack_require__(5);\n\nvar _eventLogger2 = _interopRequireDefault(_eventLogger);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n* creatStore() is the initializer for the store\n* @param {function} reducer - see the reducers in the components directory\n* @param {object} initialState - whatever you want to intialise your store with.\n*/\nexports.default = function (_ref) {\n  var reducer = _ref.reducer,\n      initialState = _ref.initialState;\n\n  var context = {};\n\n  context.makeStore = function () {\n    var store = (0, _stateMachine2.default)();\n    var events = {};\n    var isDebug = window.location.search.indexOf('debug') > -1; // if location has '?debug'\n    var doInitialRender = function doInitialRender(renderFunction, dom) {\n      var newState = reducer(initialState, { type: 'INIT' });\n      store.setState(newState);\n      if (isDebug) (0, _eventLogger2.default)(dom, 'INIT', initialState);\n      if (renderFunction) renderFunction(newState, dom, 'INIT', context.createdStore);\n    };\n\n    return {\n      getState: function getState() {\n        return store.state;\n      },\n      subscribe: function subscribe(event, listener) {\n        if (!events.hasOwnProperty.call(events, event)) events[event] = [];\n        var index = events[event].push(listener) - 1;\n        return { unsubscribe: function unsubscribe() {\n            return delete events[event][index];\n          } };\n      },\n      connect: function connect(eventsToSubscribe) {\n        return function (dom) {\n          return function (renderFunction) {\n            eventsToSubscribe.forEach(function (evt) {\n              context.createdStore.subscribe(evt, function (obj) {\n                if (isDebug) (0, _eventLogger2.default)(dom, evt, obj);\n                if (renderFunction) renderFunction(obj, dom, evt, context.createdStore);\n              });\n            });\n            doInitialRender(renderFunction, dom);\n            return context.createdStore;\n          };\n        };\n      },\n      publish: function publish(event, payload) {\n        if (!events.hasOwnProperty.call(events, event)) return;\n        store.setState(reducer(store.state, { type: event, data: payload }));\n        events[event].forEach(function (listener) {\n          return listener(store.state !== undefined ? store.state : {});\n        });\n      }\n    };\n  };\n\n  context.createdStore = context.makeStore();\n\n  return context.createdStore;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib/createStore.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/lib/createStore.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(2);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./src/index.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _componentA = __webpack_require__(3);\n\nvar _componentA2 = _interopRequireDefault(_componentA);\n\nvar _componentB = __webpack_require__(7);\n\nvar _componentB2 = _interopRequireDefault(_componentB);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  (0, _componentA2.default)({ name: '' });\n  (0, _componentB2.default)({ title: '', value: 20 });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createStore = __webpack_require__(0);\n\nvar _createStore2 = _interopRequireDefault(_createStore);\n\nvar _reducer = __webpack_require__(6);\n\nvar _reducer2 = _interopRequireDefault(_reducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Perform DOM alterations in here\nfunction render(obj, el, event) {\n  var codeBlockEl = el.querySelector('[data-id=code]');\n  var lastEventEl = el.querySelector('[data-id=last-event]');\n  var nameEl = el.querySelector('[data-id=name]');\n\n  lastEventEl.innerText = event;\n  nameEl.innerText = obj.name;\n  codeBlockEl.innerText = JSON.stringify(_extends({}, obj, { lastEvent: event }), null, 2);\n}\n\nfunction addListeners(el, store) {\n  el.querySelector('[data-id=input]').addEventListener('keyup', function (e) {\n    store.publish('SMASH_IT_IN_THERE', { name: e.target.value });\n  }, true);\n}\n\n// Entry function\n\nexports.default = function (initialState) {\n  var el = document.querySelector('[data-id=componentA');\n  var store = (0, _createStore2.default)({\n    reducer: _reducer2.default,\n    initialState: initialState\n  }).connect(['SMASH_IT_IN_THERE'])(el)(render);\n\n  addListeners(el, store);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/components/componentA/index.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/components/componentA/index.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n* State Machine Pattern\n* A function that takes initialState and returns\n* an interface for altering/getting state\n*/\nexports.default = function () {\n  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  var state = initialState;\n  var setState = function setState(newState) {\n    state = _extends({}, state, newState);\n  };\n  return {\n    setState: setState,\n    get state() {\n      return state;\n    }\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib/stateMachine.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/lib/stateMachine.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n/**\n* eventLogger() console.log's the event activity if the location contains '?debug'\n* So that you can inspect, what happened when, and by what.\n* @param {HTMLDOMElement} dom - used to extract the attributes off the element - identity\n* @param {string} event - the event that was fired.\n* @param {object} state - the current store state.\n*/\nexports.default = function (dom, event, state) {\n  var attributes = Object.keys(dom.attributes).map(function (v) {\n    return dom.attributes[v].value;\n  }).join(',');\n  console.log(attributes, // identifiable DOM attributes\n  event, state);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/lib/eventLogger.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/lib/eventLogger.js?");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// Perform STATE manipulations in here\nexports.default = function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments[1];\n\n  switch (action.type) {\n    case 'SMASH_IT_IN_THERE':\n      return _extends({}, state, action.data);\n    default:\n      return _extends({}, state);\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/components/componentA/reducer.js\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/components/componentA/reducer.js?");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createStore = __webpack_require__(0);\n\nvar _createStore2 = _interopRequireDefault(_createStore);\n\nvar _reducer = __webpack_require__(8);\n\nvar _reducer2 = _interopRequireDefault(_reducer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Perform DOM alterations in here\nfunction render(obj, el, event) {\n  var codeBlockEl = el.querySelector('[data-id=code]');\n  var lastEventEl = el.querySelector('[data-id=last-event]');\n  var titleEl = el.querySelector('[data-id=title]');\n  var valueEl = el.querySelector('[data-id=value]');\n\n  lastEventEl.innerText = event;\n  titleEl.innerText = obj.title;\n  valueEl.innerText = obj.value;\n  codeBlockEl.innerText = JSON.stringify(_extends({}, obj, { lastEvent: event }), null, 2);\n}\n\nfunction addListeners(el, store) {\n  el.querySelector('[data-id=input]').addEventListener('keyup', function (e) {\n    store.publish('UPDATE_TITLE', { title: e.target.value });\n  });\n  el.querySelector('[data-id=button-increment]').addEventListener('click', function () {\n    return store.publish('INCREMENT');\n  });\n  el.querySelector('[data-id=button-decrement]').addEventListener('click', function () {\n    return store.publish('DECREMENT');\n  });\n}\n\n// Entry function\n\nexports.default = function (initialState) {\n  var el = document.querySelector('[data-id=componentB]');\n  var store = (0, _createStore2.default)({\n    reducer: _reducer2.default,\n    initialState: initialState\n  }).connect(['UPDATE_TITLE', 'INCREMENT', 'DECREMENT'])(el)(render);\n\n  addListeners(el, store);\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/components/componentB/index.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/components/componentB/index.js?");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// Perform STATE manipulations in here\nexports.default = function () {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments[1];\n\n  switch (action.type) {\n    case 'UPDATE_TITLE':\n      return _extends({}, state, action.data);\n    case 'INCREMENT':\n      return _extends({}, state, { value: state.value + 1 });\n    case 'DECREMENT':\n      return _extends({}, state, { value: state.value - 1 });\n    default:\n      return _extends({}, state);\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/components/componentB/reducer.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/components/componentB/reducer.js?");

/***/ })
/******/ ]);
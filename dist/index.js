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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stateMachine = __webpack_require__(4);

var _stateMachine2 = _interopRequireDefault(_stateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* creatStore() is the initializer for the store
* @param {function} reducer - see addThingsReducer
* @param {object} initialState - whatever you want to intialise your
* store with - this part of state will sit under th name of the
* function in the object tree.
*/
exports.default = function (_ref) {
  var reducer = _ref.reducer,
      initialState = _ref.initialState;

  var context = {};

  context.pubSub = function () {
    var store = (0, _stateMachine2.default)();
    var events = {};

    return {
      getState: function getState() {
        return store.state;
      },

      subscribe: function subscribe(event, listener) {
        if (!events.hasOwnProperty.call(events, event)) events[event] = [];
        var index = events[event].push(listener) - 1;
        return {
          unsubscribe: function unsubscribe() {
            return delete events[event][index];
          }
        };
      },

      connect: function connect(eventsToSubscribe) {
        return function (dom) {
          return function (renderFunction) {
            eventsToSubscribe.forEach(function (evt) {
              context.instance.subscribe(evt, function (obj) {
                if (renderFunction) renderFunction(obj, dom, evt);
              });
              context.instance.publish(evt, reducer(initialState, { type: 'INIT' }));
            });
            return context.instance;
          };
        };
      },

      publish: function publish(event, payload) {
        if (!events.hasOwnProperty.call(events, event)) return;
        store.setState(reducer(store.state, { type: event, data: payload }));
        events[event].forEach(function (listener) {
          listener(store.state !== undefined ? store.state : {});
        });
        // Print each published message if location has '?debug'
        if (window.location.search.indexOf('debug') > -1) console.log(event, payload);
      }
    };
  };

  context.instance = context.pubSub();

  return context.instance;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _a = __webpack_require__(3);

var _a2 = _interopRequireDefault(_a);

var _b = __webpack_require__(5);

var _b2 = _interopRequireDefault(_b);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _a2.default)({ thing: 'ddd', aaa: '' });
  (0, _b2.default)({ a_bit_of: 'initial state', bbb: '', value: 20 });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createStore = __webpack_require__(0);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Perform STATE manipulations in here
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_IT_AS_IT_COMES':
      return _extends({}, state, action.data);
    default:
      return _extends({}, state);
  }
}

// Perform DOM alterations in here
function render(obj, dom, event) {
  var el = dom;
  el.innerText = JSON.stringify(_extends({}, obj, { lastEvent: event }), null, 2);
  el.classList.remove('added-data');
  setTimeout(function () {
    return el.classList.add('added-data');
  });
  el.setAttribute('data-last-event-fired', event);
}

// Setup connections in here
function setupListeners(store) {
  document.querySelector('#inputAAA').addEventListener('keyup', function (e) {
    store.publish('ADD_IT_AS_IT_COMES', { aaa: e.target.value });
  });
}

// Entry function

exports.default = function (initialState) {
  var dom = document.querySelector('#connected1');
  var store = (0, _createStore2.default)({
    reducer: reducer,
    initialState: initialState
  }).connect(['ADD_IT_AS_IT_COMES'])(dom)(render);

  setupListeners(store);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
* State Machine Pattern
* A function that takes initialState and returns
* an interface for altering/getting state
*/
exports.default = function () {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var state = initialState;
  var setState = function setState(newState) {
    state = _extends({}, state, newState);
  };
  return {
    setState: setState,
    get state() {
      return state;
    }
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createStore = __webpack_require__(0);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Perform STATE manipulations in here
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_TEXT':
      return _extends({}, state, action.data);
    case 'INCREMENT':
      return _extends({}, state, { value: state.value + 1 });
    case 'DECREMENT':
      return _extends({}, state, { value: state.value - 1 });
    default:
      return _extends({}, state);
  }
}

// Perform DOM alterations in here
function render(obj, dom, event) {
  var el = dom;
  el.innerText = JSON.stringify(_extends({}, obj, { lastEvent: event }), null, 2);
  el.classList.remove('added-data');
  setTimeout(function () {
    return el.classList.add('added-data');
  });
  el.setAttribute('data-last-event-fired', event);
}

// Setup connections in here
function setupListeners(store) {
  document.querySelector('#inputBBB').addEventListener('keyup', function (e) {
    store.publish('ADD_TEXT', { bbb: e.target.value });
  });
  document.querySelector('#buttonIncrement').addEventListener('click', function () {
    store.publish('INCREMENT');
  });
  document.querySelector('#buttonDecrement').addEventListener('click', function () {
    store.publish('DECREMENT');
  });
}

// Entry function

exports.default = function (initialState) {
  var dom = document.querySelector('#connected2');
  var store = (0, _createStore2.default)({
    reducer: reducer,
    initialState: initialState
  }).connect(['ADD_TEXT', 'INCREMENT', 'DECREMENT'])(dom)(render);

  setupListeners(store);
};

/***/ })
/******/ ]);
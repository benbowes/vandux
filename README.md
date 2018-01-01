# Vandux

![Build status](https://api.travis-ci.org/benbowes/redux-style-store-vanilla-js.svg?branch=master)

So you want a Redux solution for components, but you have to deal with server rendered DOM that some Headed CMS spat out?

Here is an ES6 Pub/Sub pattern with a State Machine pattern combined with Reducers for said situation.

Would I recommend using this over something like React on the server and client? Nope, I would not.

What this will work well for, is those cases when you do not have a React server render, still need SEO compliance, and want predictable/testable state management.

## Demo

https://benbowes.github.io/vandux/dist/?vandux-debug

## Codepen example

https://codepen.io/benbowes/pen/RxrWBE

## Getting started

`npm install -D vandux`

or

`yarn add vandux`

Then connect your html with a Vandux store. A full example can be found in here: https://github.com/benbowes/vandux/tree/master/src

**Note that Vandux is not intended to be a global store (Might test this soon),** it is intended to be used at a component/module level. Providing your components with the ability to show you what happened when. You can have several vandux stores, all working independently.

## A Vandux code example

```html
// Some html you'd like to "connect" with a vandux store

<div class="wrapper" data-vx="componentA">
  <p>
    <b>Last event: </b><span data-vx="componentA__last-event"></span><br />
    <b>Name: </b><span data-vx="componentA__name"></span><br/>
  </p>
  <pre>
    <code data-vx="componentA__code"></code>
  </pre>
  <p><input type="text" data-vx="componentA__update-name" placeholder="Alter 'Name'"></input></p>
</div>
```

Your entry file
```js
import componentA from './componentA';

document.addEventListener('DOMContentLoaded', () => {
  // Pass in initial state
  componentA({ name: '' });
});
```

componentA.js - see the `export default` function, where initial state is passed in to the component. When the component is connected it will render with it's initial state automatically with an `INIT` action.

```js
// This is the javascript you use to "connect" your html with a vandux store.

import { createStore } from 'vandux';

function reducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.data.name
      };
    default:
      return state;
  }
}

/**
* Your render function - perform DOM manipulations in here.
* @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
* @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
*/

let $codeBlock;
let $lastEvent;
let $name;

function render(state, el, event) {
  // setup DOM Element references once
  $codeBlock = $codeBlock || el.querySelector('[data-vx=componentA__code]');
  $lastEvent = $lastEvent || el.querySelector('[data-vx=componentA__last-event]');
  $name = $name || el.querySelector('[data-vx=componentA__name]');

  // Add data to the DOM
  $lastEvent.textContent = event;
  $name.textContent = state.name;
  $codeBlock.textContent = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

/**
* Add listeners that will publish events here so that the reducer, then the render function will be invoked.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML
* component. this DOM reference is passed to the render function for convenience.
* @param {Object} store - the store interface created in the export default function...
* @param {function} store.getState
* @param {function} store.subscribe
* @param {function} store.unSubscribe
* @param {function} store.connect
* @param {function} store.publish - Currently intention is that you only use this one here
*/

function addListeners(el, store) {
  el.querySelector('[data-vx=update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));
}

/**
* Component setup function.
* You'll need to add the events you'd like to subscribe to in the `connect` function,
* the element that is the container for your html component,
* and the render function that will be invoked when your events are published.
* @param {Any} initialState - the state you'd like your component to have when it boots up.
* @param {function} reducer - manipulates state in a immutable Redux-style way.
* @param {function} connect - creates a subscription to events this component cares about
* and triggers a render when one is fired.
* @param {function} render - a function that will be called when a subscribed-to event is published.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML
* component. this DOM reference is passed to the render function for convenience.
*/

export default (initialState) => {
  const el = document.querySelector('[data-vx="componentA"]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['UPDATE_NAME'], el, render);

  addListeners(el, store);
};
```

## Debug mode
Add the query param `?vandux-debug=true` to your URL to see this kind of output in your browser console. It will show you what happened when, helping you debug race conditions.

```js
wrapper,componentB INIT {name: ""}
wrapper,componentB UPDATE_NAME {name: "a"}
wrapper,componentB UPDATE_NAME {name: "aa"}
wrapper,componentB UPDATE_NAME {name: "aaa"}
```
Note the first items are the attributes on the html component - so you can identify which component published the event.

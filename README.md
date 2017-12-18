# Vandux

![Build status](https://api.travis-ci.org/benbowes/redux-style-store-vanilla-js.svg?branch=master)

So you want a Redux solution for components, but you have to deal with server rendered DOM that some Headed CMS spat out?

Here is an ES6 Pub/Sub pattern with a State Machine pattern combined with Reducers for said situation.

## Demo

https://benbowes.github.io/vandux/dist/?vandux-debug

## Codepen example

https://codepen.io/benbowes/pen/RxrWBE

## Getting started

`npm install -D vandux`

or

`yarn add vandux`

Then connect your html with a Vandux store. A full example can be found in here: https://github.com/benbowes/vandux/tree/master/src

**Note that vandux is not intended to be a global store (Not tested globally yet), it is intended to be used at a component/module level. You can have several vandux stores, all working indepandently.**

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

```js
// This is the javascript you use to "connect" your html with a vandux store.

import { createStore } from 'vandux';

function reducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
}

/**
* Your render function - perform DOM manipulations in here.
* @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
* @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
*/

function render(state, el, event) {
  // setup DOM Element references
  const $codeBlock = el.querySelector('[data-vx=componentA__code]');
  const $lastEvent = el.querySelector('[data-vx=lcomponentA__ast-event]');
  const $name = el.querySelector('[data-vx=componentA__name]');

  // Add data to the DOM
  $lastEvent.innerText = event;
  $name.innerText = state.name;
  $codeBlock.innerText = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

/**
* Add listeners that will publish events here so that the reducer, then the render function will be invoked.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML
* component. this DOM reference is passed to the render function for convenience.
* @param {Object} store - the store interface created in the export default function...
* @param {function} store.getState
* @param {function} store.subscribe
* @param {function} store.connect
* @param {function} store.publish - Currently intention is that you only use this one here
*/

function addListeners(el, store) {
  el.querySelector('[data-vx=update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));
}

/**
* Component setup function.
* You'll need to add the events you'd like to sunscribe to in the `connect` function,
* the elemnent that is the container for your html component,
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

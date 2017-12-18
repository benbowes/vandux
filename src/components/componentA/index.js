import { createStore } from '../../lib/vandux';
import reducer from './reducer';

/**
* Your render function - perform DOM manipulations in here.
* Ensure you only do a querySelector once for performance.
* @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
* @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
*/

let $codeBlock;
let $lastEvent;
let $isOpen;
let $selector;

function render(state, el, event) {
  // setup DOM Element references once
  $codeBlock = $codeBlock || el.querySelector('[data-vx="componentA__code"]');
  $lastEvent = $lastEvent || el.querySelector('[data-vx="componentA__last-event"]');
  $isOpen = $isOpen || el.querySelector('[data-vx="componentA__is-open"]');
  $selector = $selector || el.querySelector('[data-vx="componentA__selector"]');

  // Add data to the DOM
  if (state.open) {
    $selector.classList.add('select--open');
  } else {
    $selector.classList.remove('select--open');
  }
  $isOpen.innerText = state.open;
  $lastEvent.innerText = event;
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
  el.querySelector('[data-vx="componentA__selector-button"]').addEventListener('click', () =>
    store.publish('TOGGLE_OPTIONS'));
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
  }).connect(['TOGGLE_OPTIONS'], el, render);

  addListeners(el, store);
};

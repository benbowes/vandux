import { createStore } from '../../lib/vandux';
import reducer from './reducer';

/**
* Your render function - perform DOM manipulations in here.
* @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
* @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
*/

function render(state, el, event) {
  // setup DOM Element references
  const $codeBlock = el.querySelector('[data-vandux_id=code]');
  const $lastEvent = el.querySelector('[data-vandux_id=last-event]');
  const $name = el.querySelector('[data-vandux_id=name]');
  const $title = el.querySelector('[data-vandux_id=title]');
  const $value = el.querySelector('[data-vandux_id=value]');

  // Add data to the DOM
  $lastEvent.innerText = event;
  $name.innerText = state.name;
  $title.innerText = state.title;
  $value.innerText = state.value;
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
  el.querySelector('[data-vandux_id=update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));

  el.querySelector('[data-vandux_id=update-title]').addEventListener('keyup', e =>
    store.publish('UPDATE_TITLE', { title: e.target.value }));

  el.querySelector('[data-vandux_id=button-increment]').addEventListener('click', () =>
    store.publish('INCREMENT'));

  el.querySelector('[data-vandux_id=button-decrement]').addEventListener('click', () =>
    store.publish('DECREMENT'));
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
  const el = document.querySelector('[data-vandux_id=componentB]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['UPDATE_NAME', 'UPDATE_TITLE', 'INCREMENT', 'DECREMENT'], el, render);

  addListeners(el, store);
};

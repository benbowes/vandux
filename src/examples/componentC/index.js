import { createStore } from '../../../dist/vandux';
import reducer from './reducer';
import asyncRequest from './asyncRequest';
import render from './render';

/**
  * Add listeners that will publish events here so that the reducer, then the
  * render function will be invoked.
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
  el.querySelector('[data-vx="componentC__button-async"]').addEventListener('click', () => {
    store.publish('MAKE_ASYNC_REQUEST'); // Sets loading state
    asyncRequest(store); // Make async request
  });
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
  const el = document.querySelector('[data-vx="componentC"]');

  const store = createStore({ reducer, initialState }).connect([
    'MAKE_ASYNC_REQUEST',
    'RECIEVE_ASYNC_REQUEST',
    'ASYNC_REQUEST_FAILED'
  ], el, render);

  addListeners(el, store);
};

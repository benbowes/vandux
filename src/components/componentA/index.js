import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(state, el, event) {
  // setup DOM Element references
  const codeBlockEl = el.querySelector('[data-id=code]');
  const lastEventEl = el.querySelector('[data-id=last-event]');
  const isOpenEl = el.querySelector('[data-id="is-open"]');
  const buttonEl = el.querySelector('[data-id=selector]');

  // Add data to the DOM
  if (state.open) {
    buttonEl.classList.add('select--open');
  } else {
    buttonEl.classList.remove('select--open');
  }
  isOpenEl.innerText = state.open;
  lastEventEl.innerText = event;
  codeBlockEl.innerText = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-id=selector-button]').addEventListener('click', () =>
    store.publish('TOGGLE_OPTIONS'));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-id=componentA]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['TOGGLE_OPTIONS'], el, render);

  addListeners(el, store);
};

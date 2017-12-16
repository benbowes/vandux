import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(state, el, event) {
  // setup DOM Element references
  const $codeBlock = el.querySelector('[data-vandux-id=code]');
  const $lastEvent = el.querySelector('[data-vandux-id=last-event]');
  const $isOpen = el.querySelector('[data-vandux-id="is-open"]');
  const $button = el.querySelector('[data-vandux-id=selector]');

  // Add data to the DOM
  if (state.open) {
    $button.classList.add('select--open');
  } else {
    $button.classList.remove('select--open');
  }
  $isOpen.innerText = state.open;
  $lastEvent.innerText = event;
  $codeBlock.innerText = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-vandux-id=selector-button]').addEventListener('click', () =>
    store.publish('TOGGLE_OPTIONS'));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-vandux-id=componentA]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['TOGGLE_OPTIONS'], el, render);

  addListeners(el, store);
};

import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(state, el, event) {
  const codeBlockEl = el.querySelector('[data-id=code]');
  const lastEventEl = el.querySelector('[data-id=last-event]');
  const buttonEl = el.querySelector('[data-id=selector]');

  if (state.open) {
    buttonEl.classList.add('select--open');
  } else {
    buttonEl.classList.remove('select--open');
  }

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

  // Returning here is not required - solely for tests
  return { el, store };
};

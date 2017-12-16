import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(state, el, event) {
  // setup DOM Element references
  const $codeBlock = el.querySelector('[data-vandux-id=code]');
  const $lastEvent = el.querySelector('[data-vandux-id=last-event]');
  const $name = el.querySelector('[data-vandux-id=name]');
  const $title = el.querySelector('[data-vandux-id=title]');
  const $value = el.querySelector('[data-vandux-id=value]');

  // Add data to the DOM
  $lastEvent.innerText = event;
  $name.innerText = state.name;
  $title.innerText = state.title;
  $value.innerText = state.value;
  $codeBlock.innerText = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-vandux-id=update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));

  el.querySelector('[data-vandux-id=update-title]').addEventListener('keyup', e =>
    store.publish('UPDATE_TITLE', { title: e.target.value }));

  el.querySelector('[data-vandux-id=button-increment]').addEventListener('click', () =>
    store.publish('INCREMENT'));

  el.querySelector('[data-vandux-id=button-decrement]').addEventListener('click', () =>
    store.publish('DECREMENT'));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-vandux-id=componentB]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['UPDATE_NAME', 'UPDATE_TITLE', 'INCREMENT', 'DECREMENT'], el, render);

  addListeners(el, store);
};

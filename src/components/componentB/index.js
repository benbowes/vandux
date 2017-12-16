import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(state, el, event) {
  const codeBlockEl = el.querySelector('[data-id=code]');
  const lastEventEl = el.querySelector('[data-id=last-event]');
  const nameEl = el.querySelector('[data-id=name]');
  const titleEl = el.querySelector('[data-id=title]');
  const valueEl = el.querySelector('[data-id=value]');

  lastEventEl.innerText = event;
  nameEl.innerText = state.name;
  titleEl.innerText = state.title;
  valueEl.innerText = state.value;
  codeBlockEl.innerText = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-id=update-name]').addEventListener('keyup', e =>
    store.publish('UPDATE_NAME', { name: e.target.value }));

  el.querySelector('[data-id=update-title]').addEventListener('keyup', e =>
    store.publish('UPDATE_TITLE', { title: e.target.value }));

  el.querySelector('[data-id=button-increment]').addEventListener('click', () =>
    store.publish('INCREMENT'));

  el.querySelector('[data-id=button-decrement]').addEventListener('click', () =>
    store.publish('DECREMENT'));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-id=componentB]');

  const store = createStore({
    reducer,
    initialState
  }).connect(['UPDATE_NAME', 'UPDATE_TITLE', 'INCREMENT', 'DECREMENT'], el, render);

  addListeners(el, store);

  // Returning here is not required - solely for tests
  return { el, store };
};

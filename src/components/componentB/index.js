import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(obj, el, event) {
  const codeBlockEl = el.querySelector('[data-id=code]');
  const lastEventEl = el.querySelector('[data-id=last-event]');
  const titleEl = el.querySelector('[data-id=title]');
  const valueEl = el.querySelector('[data-id=value]');

  lastEventEl.innerText = event;
  titleEl.innerText = obj.title;
  valueEl.innerText = obj.value;
  codeBlockEl.innerText = JSON.stringify({ ...obj, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-id=input]').addEventListener('keyup', (e) => {
    store.publish('UPDATE_TITLE', { title: e.target.value });
  });
  el.querySelector('[data-id=button-increment]').addEventListener('click', () => store.publish('INCREMENT'));
  el.querySelector('[data-id=button-decrement]').addEventListener('click', () => store.publish('DECREMENT'));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-id=componentB]');
  const store = createStore({
    reducer,
    initialState
  }).connect(['UPDATE_TITLE', 'INCREMENT', 'DECREMENT'])(el)(render);

  addListeners(el, store);
};

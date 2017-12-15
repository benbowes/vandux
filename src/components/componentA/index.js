import createStore from '../../lib/createStore';
import reducer from './reducer';

// Perform DOM alterations in here
function render(obj, el, event) {
  const codeBlockEl = el.querySelector('[data-id=code]');
  const lastEventEl = el.querySelector('[data-id=last-event]');
  const nameEl = el.querySelector('[data-id=name]');

  lastEventEl.innerText = event;
  nameEl.innerText = obj.name;
  codeBlockEl.innerText = JSON.stringify({ ...obj, lastEvent: event }, null, 2);
}

function addListeners(el, store) {
  el.querySelector('[data-id=input]').addEventListener('keyup', e =>
    store.publish('SMASH_IT_IN_THERE', { name: e.target.value }));
}

// Entry function
export default (initialState) => {
  const el = document.querySelector('[data-id=componentA');

  const store = createStore({
    reducer,
    initialState
  }).connect(['SMASH_IT_IN_THERE'], el, render);

  addListeners(el, store);
};

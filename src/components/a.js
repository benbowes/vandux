import createStore from '../lib/createStore';

// Perform STATE manipulations in here
function reducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_IT_AS_IT_COMES':
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
}

// Perform DOM alterations in here
function render(obj, dom, event) {
  const el = dom;
  el.innerText = JSON.stringify({ ...obj, lastEvent: event }, null, 2);
  el.setAttribute('data-last-event-fired', event);
}

// Setup connections in here
function setupListeners(store) {
  document.querySelector('#inputAAA').addEventListener('keyup', (e) => {
    store.publish('ADD_IT_AS_IT_COMES', { aaa: e.target.value });
  });
}

// Entry function
export default (initialState) => {
  const dom = document.querySelector('#connected1');
  const store = createStore({
    reducer,
    initialState
  }).connect(['ADD_IT_AS_IT_COMES'])(dom)(render);

  setupListeners(store);
};

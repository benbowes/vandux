import createStore from '../lib/createStore';

// Perform STATE manipulations in here
function reducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_THINGS':
      return { ...state, ...action.data };
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
}

// Perform DOM alterations in here
function render(obj, dom, event) {
  const el = dom;
  el.innerText = JSON.stringify(obj, null, 2);
  el.setAttribute('data-last-event-fired', event);
}

// Setup connections in here
function setupListeners(store) {
  document.querySelector('#inputBBB').addEventListener('keyup', (e) => {
    store.publish('ADD_THINGS', { bbb: e.target.value });
  });
  document.querySelector('#buttonIncrement').addEventListener('click', () => {
    store.publish('INCREMENT');
  });
  document.querySelector('#buttonDecrement').addEventListener('click', () => {
    store.publish('DECREMENT');
  });
}

// Entry function
export default (initialState) => {
  const dom = document.querySelector('#connected2');
  const store = createStore({
    reducer,
    initialState
  }).connect(['ADD_THINGS', 'INCREMENT', 'DECREMENT'])(dom)(render);

  setupListeners(store);
};

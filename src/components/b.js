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
  const newValue = JSON.stringify(obj, null, 2);

  el.innerText = newValue;
  dom.setAttribute('data-bbb', `${event}-${obj.bbb}`);
}

export default (initialState) => {
  const dom = document.querySelector('#connected2');
  const store = createStore({
    reducer,
    initialState
  }).connect(['ADD_THINGS', 'INCREMENT', 'DECREMENT'])(dom)(render);

  document.querySelector('#inputBBB').addEventListener('keyup', (e) => {
    store.publish('ADD_THINGS', { bbb: e.target.value });
  });

  document.querySelector('#buttonIncrement').addEventListener('click', () => {
    store.publish('INCREMENT');
  });

  document.querySelector('#buttonDecrement').addEventListener('click', () => {
    store.publish('DECREMENT');
  });
};

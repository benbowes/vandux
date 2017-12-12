// Perform STATE manipulations in here
export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TEXT':
      return { ...state, ...action.data };
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
};

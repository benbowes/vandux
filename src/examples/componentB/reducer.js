// Perform STATE manipulations in here

export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.data.name
      };

    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.data.title
      };

    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1
      };

    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1
      };

    default:
      return state;
  }
};

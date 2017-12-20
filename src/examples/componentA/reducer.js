// Perform STATE manipulations in here
export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_OPTIONS':
      return {
        ...state,
        open: !state.open
      };

    default:
      return {
        ...state
      };
  }
};

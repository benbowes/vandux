// Perform STATE manipulations in here
export default (state = {}, action) => {
  switch (action.type) {
    case 'SMASH_IT_IN_THERE':
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};

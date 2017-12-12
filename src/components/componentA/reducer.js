// Perform STATE manipulations in here
export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IT_AS_IT_COMES':
      return { ...state, ...action.data };
    default:
      return { ...state };
  }
};

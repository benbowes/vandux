/**
* State Machine Pattern
* A function that takes initialState and returns
* an interface for altering/getting state
*/
export default (initialState = {}) => {
  let state = initialState;
  const setState = (newState) => {
    state = { ...state, ...newState };
  };
  return {
    setState,
    get state() { return state; }
  };
};

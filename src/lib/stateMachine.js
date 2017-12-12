/**
* State Machine Pattern
* A higher order function that takes initailState and returns
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

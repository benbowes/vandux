import * as TYPES from './types';
/**
* State Machine Pattern
* A function that takes initialState and returns
* an interface for altering/getting state
*/

export default (initialState: TYPES.State = {}): TYPES.IStateMachine => {
  let state = initialState;

  const setState = (newState: TYPES.State): void => {
    state = { ...state, ...newState };
  };

  return {
    setState,
    get state() { return state; }
  };
};

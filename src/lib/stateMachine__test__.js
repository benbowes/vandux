import { expect } from 'chai';
import stateMachine from './stateMachine';
import deepFreeze from 'deep-freeze';

describe('stateMachine', () => {
  it('should setup with initialState and get state', () => {
    const initialState = {
      a: 1,
      b: { c: [3, 2, 1] }
    };
    deepFreeze(initialState);

    const sm = stateMachine(initialState);
    expect(sm.state).to.eql(initialState);
  });

  it('should be able to setState and get state', () => {
    const initialState = {
      a: 1,
      b: { c: [3, 2, 1] }
    };
    deepFreeze(initialState);

    const sm = stateMachine(initialState);
    sm.setState({ a: 2, b: { c: 3 } });

    expect(sm.state).to.eql({ a: 2, b: { c: 3 } });
  });

  it('should not mutate state', () => {
    const initialState = {
      a: 1,
      b: { c: [3, 2, 1] }
    };
    deepFreeze(initialState);

    const sm = stateMachine(initialState);
    sm.setState({ a: 2, b: { c: 3 } });

    expect(initialState.b).to.eql({ c: [3, 2, 1] });
  });
});

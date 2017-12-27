import 'mocha';
import { expect } from 'chai';
import simulant from 'jsdom-simulant';
import { createStore } from '../../dist/vandux';
import setupJSDOM from '../../test-config/jsdom';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state };

    case 'SOME_EVENT':
      return { ...state, ...action.data };

    default:
      return { ...state };
  }
};

function render(...params) {
  return params;
}

function addListeners(el, store) {
  el.addEventListener('click', () => store.publish('SOME_EVENT', { name: 'Captain Barnacles' }));
}

const initialState = { open: false };

describe('vandux', () => {
  let store;
  let el;

  describe('createStore', () => {
    before((done) => {
      setupJSDOM.then(() => {
        el = document.querySelector('[data-vx=componentA]');
        store = createStore({
          reducer,
          initialState
        }).connect(['SOME_EVENT'], el, render);
        addListeners(el, store);

        done();
      });
    });

    it('should setup and return expected interface', () => {
      expect(store.getState).to.be.an('function');
      expect(store.subscribe).to.be.an('function');
      expect(store.unSubscribe).to.be.an('function');
      expect(store.publish).to.be.an('function');
    });
  });

  describe('should reflect state changes after publishing an event', () => {
    it('should have initial state', () => {
      expect(store.getState()).to.eql(initialState);
    });

    it('publish updates state', () => {
      store.publish('SOME_EVENT', { name: 'My name is Vandux' });
      expect(store.getState()).to.eql({
        open: false,
        name: 'My name is Vandux'
      });
    });
  });

  describe('should be connect`d if the dom can use an eventListener to publish events, store should be updated', () => {
    it('connect`d element publishes an event that it is subscribe`d to, and state is updated', () => {
      simulant.fire(el, 'click');
      expect(store.getState()).to.eql({
        open: false,
        name: 'Captain Barnacles'
      });
    });
  });

  describe('subscriptions to events can be terminated', () => {
    it('connect`d element publishes an event it is subscribe`d to, and state is updated', () => {
      store.unSubscribe('SOME_EVENT');
      store.publish('SOME_EVENT', { name: 'My name is Vandux' });

      // Publishing event had no affect as it has been unSubscribed
      expect(store.getState()).to.eql({
        open: false,
        name: 'Captain Barnacles'
      });
    });
  });
});

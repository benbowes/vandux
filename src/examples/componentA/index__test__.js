import { expect } from 'chai';
import componentA from './index';
import simulant from 'jsdom-simulant';
import setupJSDOM from '../../../test-config/jsdom';

describe('componentA', () => {
  let componentDom;

  before((done) => {
    setupJSDOM.then(() => {
      componentDom = document.querySelector('[data-vx="componentA"]');
      componentA({ open: false });
      done();
    });
  });

  it('should setup with initialState', () => {
    expect(componentDom.querySelector('[data-vx="componentA__selector"]').classList.contains('select')).to.equal(true);
    expect(componentDom.querySelector('[data-vx="componentA__selector"]').classList.contains('select--open')).to.equal(false);
  });

  it('should open selector when first interacted with', () => {
    simulant.fire(componentDom.querySelector('[data-vx="componentA__selector-button"]'), 'click');
    expect(componentDom.querySelector('[data-vx="componentA__selector"]').classList.contains('select--open')).to.equal(true);
  });

  it('should close selector when interacted with again', () => {
    simulant.fire(componentDom.querySelector('[data-vx="componentA__selector-button"]'), 'click');
    expect(componentDom.querySelector('[data-vx="componentA__selector"]').classList.contains('select--open')).to.equal(false);
  });
});

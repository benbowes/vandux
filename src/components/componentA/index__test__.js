import { expect } from 'chai';
import componentA from './index';
import simulant from 'jsdom-simulant';

let component;
let componentDom;

describe('componentA', () => {
  before(() => {
    component = componentA({ open: false });
    componentDom = document.querySelector('[data-id="componentA"]');
  });

  it('should setup with initialState', () => {
    expect(componentDom.querySelector('[data-id="selector"]').classList.contains('select')).to.equal(true);
    expect(componentDom.querySelector('[data-id="selector"]').classList.contains('select--open')).to.equal(false);
  });

  it('should open selector when first interacted with', () => {
    simulant.fire(componentDom.querySelector('[data-id="selector-button"]'), 'click');

    expect(component.store.getState().open).to.equal(true);
    expect(componentDom.querySelector('[data-id="selector"]').classList.contains('select--open')).to.equal(true);
  });

  it('should close selector when interacted with again', () => {
    simulant.fire(componentDom.querySelector('[data-id="selector-button"]'), 'click');

    expect(component.store.getState().open).to.equal(false);
    expect(componentDom.querySelector('[data-id="selector"]').classList.contains('select--open')).to.equal(false);
  });
});

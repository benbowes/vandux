import { expect } from 'chai';
import componentB from './index';
import simulant from 'jsdom-simulant';
import setupJSDOM from '../../../test-config/jsdom';

describe('componentB', () => {
  let componentDom;

  before((done) => {
    setupJSDOM.then(() => {
      componentDom = document.querySelector('[data-vx="componentB"]');
      componentB({ name: '', title: '', value: 20 });
      done();
    });
  });

  it('should setup with initialState', () => {
    expect(componentDom.querySelector('[data-vx="componentB__name"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-vx="componentB__title"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-vx="componentB__value"]').innerText).to.equal(20);
  });

  it('should update "name" when interacted with', () => {
    componentDom.querySelector('[data-vx="componentB__update-name"]').value = 'Bill Blank';
    simulant.fire(componentDom.querySelector('[data-vx="componentB__update-name"]'), 'keyup');
    expect(componentDom.querySelector('[data-vx="componentB__name"]').innerText).to.equal('Bill Blank');
  });

  it('should update "title" when interacted with', () => {
    componentDom.querySelector('[data-vx="componentB__update-title"]').value = 'Mr';
    simulant.fire(componentDom.querySelector('[data-vx="componentB__update-title"]'), 'keyup');
    expect(componentDom.querySelector('[data-vx="componentB__title"]').innerText).to.equal('Mr');
  });

  it('should update "value" when interacted with', () => {
    simulant.fire(componentDom.querySelector('[data-vx="componentB__button-increment"]'), 'click'); // +1 = 21
    simulant.fire(componentDom.querySelector('[data-vx="componentB__button-increment"]'), 'click'); // +1 = 22
    simulant.fire(componentDom.querySelector('[data-vx="componentB__button-increment"]'), 'click'); // +1 = 23
    simulant.fire(componentDom.querySelector('[data-vx="componentB__button-decrement"]'), 'click'); // -1 = 22
    expect(componentDom.querySelector('[data-vx="componentB__value"]').innerText).to.equal(22);
  });
});

import { expect } from 'chai';
import componentB from './index';
import simulant from 'jsdom-simulant';
import setupJSDOM from '../../../test-config/jsdom';

describe('componentB', () => {
  let componentDom;

  before((done) => {
    setupJSDOM.then(() => {
      componentDom = document.querySelector('[data-vandux_id="componentB"]');
      componentB({ name: '', title: '', value: 20 });
      done();
    });
  });

  it('should setup with initialState', () => {
    expect(componentDom.querySelector('[data-vandux_id="name"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-vandux_id="title"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-vandux_id="value"]').innerText).to.equal(20);
  });

  it('should update "name" when interacted with', () => {
    componentDom.querySelector('[data-vandux_id="update-name"]').value = 'Bill Blank';
    simulant.fire(componentDom.querySelector('[data-vandux_id="update-name"]'), 'keyup');
    expect(componentDom.querySelector('[data-vandux_id="name"]').innerText).to.equal('Bill Blank');
  });

  it('should update "title" when interacted with', () => {
    componentDom.querySelector('[data-vandux_id="update-title"]').value = 'Mr';
    simulant.fire(componentDom.querySelector('[data-vandux_id="update-title"]'), 'keyup');
    expect(componentDom.querySelector('[data-vandux_id="title"]').innerText).to.equal('Mr');
  });

  it('should update "value" when interacted with', () => {
    simulant.fire(componentDom.querySelector('[data-vandux_id="button-increment"]'), 'click'); // +1 = 21
    simulant.fire(componentDom.querySelector('[data-vandux_id="button-increment"]'), 'click'); // +1 = 22
    simulant.fire(componentDom.querySelector('[data-vandux_id="button-increment"]'), 'click'); // +1 = 23
    simulant.fire(componentDom.querySelector('[data-vandux_id="button-decrement"]'), 'click'); // -1 = 22
    expect(componentDom.querySelector('[data-vandux_id="value"]').innerText).to.equal(22);
  });
});

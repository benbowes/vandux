import { expect } from 'chai';
import componentB from './index';
import simulant from 'jsdom-simulant';

let component;
let componentDom;

describe('componentB', () => {
  before(() => {
    component = componentB({ name: '', title: '', value: 20 });
    componentDom = document.querySelector('[data-id="componentB"]');
  });

  it('should setup with initialState', () => {
    expect(componentDom.querySelector('[data-id="name"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-id="title"]').innerText).to.equal('');
    expect(componentDom.querySelector('[data-id="value"]').innerText).to.equal(20);
  });

  it('should update "name" when interacted with', () => {
    componentDom.querySelector('[data-id="update-name"]').value = 'Bill Blank';
    simulant.fire(componentDom.querySelector('[data-id="update-name"]'), 'keyup');

    expect(component.store.getState().name).to.equal('Bill Blank');
    expect(componentDom.querySelector('[data-id="name"]').innerText).to.equal('Bill Blank');
  });

  it('should update "title" when interacted with', () => {
    componentDom.querySelector('[data-id="update-title"]').value = 'Mr';
    simulant.fire(componentDom.querySelector('[data-id="update-title"]'), 'keyup');

    expect(component.store.getState().title).to.equal('Mr');
    expect(componentDom.querySelector('[data-id="title"]').innerText).to.equal('Mr');
  });

  it('should update "value" when interacted with', () => {
    simulant.fire(componentDom.querySelector('[data-id="button-increment"]'), 'click'); // +1 = 21
    simulant.fire(componentDom.querySelector('[data-id="button-increment"]'), 'click'); // +1 = 22
    simulant.fire(componentDom.querySelector('[data-id="button-increment"]'), 'click'); // +1 = 23
    simulant.fire(componentDom.querySelector('[data-id="button-decrement"]'), 'click'); // -1 = 22

    expect(component.store.getState().value).to.equal(22);
    expect(componentDom.querySelector('[data-id="value"]').innerText).to.equal(22);
  });
});
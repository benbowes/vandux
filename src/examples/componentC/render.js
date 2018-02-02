/**
  * Your render function - perform DOM manipulations in here.
  * @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
  * @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
  * @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
  */

let $lastEvent;
let $codeBlock;
let $results;
let $button;

export default function render(state, el, event) {
  $lastEvent = $lastEvent || el.querySelector('[data-vx="componentC__last-event"]');
  $codeBlock = $codeBlock || el.querySelector('[data-vx="componentC__code"]');
  $results = $results || el.querySelector('[data-vx="componentC__results"]');
  $button = $button || el.querySelector('[data-vx="componentC__button-async"]');

  $lastEvent.textContent = event;
  $codeBlock.textContent = JSON.stringify({ ...state, lastEvent: event }, null, 2);
  $results.innerHTML = (!!(state.error) !== false)
    ? state.error
    : `<ol>${state.results.map(v => `<li>${v}</li>`).join('')}</ol>`;

  $button.setAttribute('class', (state.isLoading ? 'is-loading' : ''));
}

/**
  * Your render function - perform DOM manipulations in here.
  * Ensure you only do a querySelector once for performance.
  * @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
  * @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
  * @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
  */

let $codeBlock;
let $lastEvent;
let $isOpen;
let $selector;

export default function render(state, el, event) {
  // setup DOM Element references once
  $codeBlock = $codeBlock || el.querySelector('[data-vx="componentA__code"]');
  $lastEvent = $lastEvent || el.querySelector('[data-vx="componentA__last-event"]');
  $isOpen = $isOpen || el.querySelector('[data-vx="componentA__is-open"]');
  $selector = $selector || el.querySelector('[data-vx="componentA__selector"]');

  // Add data to the DOM
  if (state.open) {
    $selector.classList.add('select--open');
  } else {
    $selector.classList.remove('select--open');
  }

  $isOpen.textContent = state.open;
  $lastEvent.textContent = event;
  $codeBlock.textContent = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

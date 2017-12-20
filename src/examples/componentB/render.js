/**
* Your render function - perform DOM manipulations in here.
* @param {Any} state - a new version of state that was manipulated by your reducer after an event was fired.
* @param {HTMLDOMElement} el - a DOM reference that should be the container for your HTML component.
* @param {String} event - the event that was fired e.g. 'TOGGLE_OPTIONS'.
*/

let $codeBlock;
let $lastEvent;
let $name;
let $title;
let $value;

export default function render(state, el, event) {
  // setup DOM Element references once
  $codeBlock = $codeBlock || el.querySelector('[data-vx="componentB__code"]');
  $lastEvent = $lastEvent || el.querySelector('[data-vx="componentB__last-event"]');
  $name = $name || el.querySelector('[data-vx="componentB__name"]');
  $title = $title || el.querySelector('[data-vx="componentB__title"]');
  $value = $value || el.querySelector('[data-vx="componentB__value"]');

  // Add data to the DOM
  $lastEvent.textContent = event;
  $name.textContent = state.name;
  $title.textContent = state.title;
  $value.textContent = state.value;
  $codeBlock.textContent = JSON.stringify({ ...state, lastEvent: event }, null, 2);
}

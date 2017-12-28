import * as TYPES from './types';
/**
* eventLogger() console.log's the event activity if the location contains '?debug'
* So that you can inspect, what happened when, and by what.
* @param {HTMLDOMElement} el - used to extract the attributes off the element - identity
* @param {string} eventType - the event that was fired.
* @param {object} state - the current store state.
*/
export default (el: Element, eventType: string, state: TYPES.State): void => {
  // Extract the attributes off the element so that we can have something unique-ish to differentiate logged output
  const attributes = Object.keys(el.attributes).map((v) => el.attributes[v].value).join(',');

  console.log(
    attributes, // identifiable DOM attributes
    eventType,
    state
  );
};

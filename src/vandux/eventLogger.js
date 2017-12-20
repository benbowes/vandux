/**
* eventLogger() console.log's the event activity if the location contains '?debug'
* So that you can inspect, what happened when, and by what.
* @param {HTMLDOMElement} dom - used to extract the attributes off the element - identity
* @param {string} event - the event that was fired.
* @param {object} state - the current store state.
*/
export default (dom, event, state) => {
  const attributes = Object.keys(dom.attributes).map((v) => dom.attributes[v].value).join(',');
  console.log(
    attributes, // identifiable DOM attributes
    event,
    state
  );
};

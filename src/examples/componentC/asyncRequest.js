const mockResponse = ['Lorem ipsum', 'Dolor amet', 'Eventis', 'Seguro'];
let counter = 0;

/**
  * Mock out an async request. Pass then fail, then pass, then fail...
  */

export default function asyncRequest(store) {
  counter += 1;

  if (counter % 2 === 1) {
    setTimeout(() => store.publish('RECIEVE_ASYNC_REQUEST', { results: mockResponse }), 2000);
  } else {
    setTimeout(() => store.publish('ASYNC_REQUEST_FAILED', {
      results: [],
      error: 'Sorry but your request failed :('
    }), 2000);
  }
}

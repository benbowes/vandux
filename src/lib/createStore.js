import stateMachine from './stateMachine';

/**
* creatStore() is the initializer for the store
* @param {function} reducer - see addThingsReducer
* @param {object} initialState - whatever you want to intialise your
* store with - this part of state will sit under th name of the
* function in the object tree.
*/
export default ({ reducer, initialState }) => {
  const context = {};

  context.makeStore = () => {
    const store = stateMachine();
    const events = {};
    const doInitialRender = (renderFunction, dom) => {
      const newState = reducer(initialState, { type: 'INIT' });
      store.setState(newState);
      if (renderFunction) renderFunction(newState, dom, 'INIT', context.createdStore);
    };

    return {
      getState: () => store.state,
      subscribe: (event, listener) => {
        if (!events.hasOwnProperty.call(events, event)) events[event] = [];
        const index = events[event].push(listener) - 1;
        return { unsubscribe: () => delete events[event][index] };
      },
      connect: (eventsToSubscribe) => (dom) => (renderFunction) => {
        eventsToSubscribe.forEach((evt) => {
          context.createdStore.subscribe(evt, (obj) => {
            if (renderFunction) renderFunction(obj, dom, evt, context.createdStore);
          });
        });
        doInitialRender(renderFunction, dom);
        return context.createdStore;
      },
      publish: (event, payload) => {
        if (!events.hasOwnProperty.call(events, event)) return;
        store.setState(reducer(store.state, { type: event, data: payload }));
        events[event].forEach((listener) => {
          listener(store.state !== undefined ? store.state : {});
        });
        // Print each published message if location has '?debug'
        if (window.location.search.indexOf('debug') > -1) console.log(event, payload);
      }
    };
  };

  context.createdStore = context.makeStore();

  return context.createdStore;
};

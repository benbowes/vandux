import stateMachine from './stateMachine';
import eventLogger from './eventLogger';

/**
* @param {function} reducer - see the reducers in the components directory
* @param {object} initialState - whatever you want to intialise your store with.
*/
export default ({ reducer, initialState }) => {
  const context = {};

  context.makeStore = () => {
    const store = stateMachine();
    const events = {};
    const isDebug = (window.location.search.indexOf('debug') > -1); // if location has '?debug'
    const doInitialRender = (renderFunction, dom) => {
      const newState = reducer(initialState, { type: 'INIT' });
      store.setState(newState);
      if (isDebug) eventLogger(dom, 'INIT', initialState);
      if (renderFunction) renderFunction(newState, dom, 'INIT', context.createdStore);
    };

    return {
      getState: () => store.state,
      subscribe: (event, listener) => {
        if (!events.hasOwnProperty.call(events, event)) events[event] = [];
        const index = events[event].push(listener) - 1;
        return { unsubscribe: () => delete events[event][index] };
      },
      connect: (eventsToSubscribe, dom, renderFunction) => {
        eventsToSubscribe.forEach((evt) => {
          context.createdStore.subscribe(evt, (obj) => {
            if (isDebug) eventLogger(dom, evt, obj);
            if (renderFunction) renderFunction(obj, dom, evt, context.createdStore);
          });
        });
        doInitialRender(renderFunction, dom);
        return context.createdStore;
      },
      publish: (event, payload) => {
        if (!events.hasOwnProperty.call(events, event)) return;
        store.setState(reducer(store.state, { type: event, data: payload }));
        events[event].forEach(listener => listener(store.state !== undefined ? store.state : {}));
      }
    };
  };

  context.createdStore = context.makeStore();

  return context.createdStore;
};

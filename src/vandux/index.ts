import stateMachine from './stateMachine';
import eventLogger from './eventLogger';
import { RenderFunction, SubscriptionFunction, Context } from './types';

/**
* @param {function} reducer - see the reducers in the components directory
* @param {object} initialState - whatever you want to intialise your store with.
*/

export function createStore({ reducer, initialState }) {

  const context: Context = {
    makeStore: undefined,
    createdStore: undefined
  };

  context.makeStore = () => {
    const store = stateMachine();
    const events:object = {};
    const isDebug:boolean = (window.location.search.indexOf('vandux-debug') > -1); // if location has '?vandux-debug'

    const doInitialRender = (renderFunction:RenderFunction, el:Element):void => {
      const newState = reducer(initialState, { type: 'INIT' });
      store.setState(newState);
      // Report in browser console if window.location has `?vandux-debug`
      if (isDebug) eventLogger(el, 'INIT', initialState);
      renderFunction(newState, el, 'INIT', context.createdStore);
    };

    return {
      subscribe: (eventType:string, subscriptionFunc:SubscriptionFunction) => {
        // Add a new `eventType` key with an array to pop SubscribeFunction's into, if it doesn't exist
        if (!events.hasOwnProperty.call(events, eventType)) events[eventType] = [];
        // Pop desired SubscribeFunction into `eventType`s array
        events[eventType].push(subscriptionFunc);
      },

      unSubscribe: (eventType:string) => {
        // Delete given `eventType` off `events`. Kills all `SubscribeFunction`s under `eventType`
        delete events[eventType];
      },

      connect: (eventsTypesToSubscribe:string[], el:Element, renderFunction:RenderFunction) => {
        eventsTypesToSubscribe.forEach((evtType:string) => {
          context.createdStore.subscribe(evtType, (state:any) => {
            if (renderFunction) renderFunction(state, el, evtType, context.createdStore);
          });
        });

        doInitialRender(renderFunction, el);

        return {
          publish: context.createdStore.publish,
          subscribe: context.createdStore.subscribe,
          unSubscribe: context.createdStore.unSubscribe,
          getState: context.createdStore.getState
        };
      },

      publish: (eventType:string, payload:any) => {
        if (!events.hasOwnProperty.call(events, eventType)) return false;

        const newState = reducer(store.state, { type: eventType, data: payload });
        store.setState(newState);

        events[eventType].forEach(subscriptionFunc => {
          subscriptionFunc(store.state);
        });
      },

      getState: () => {
        return store.state;
      }
    };
  };

  context.createdStore = context.makeStore();

  return context.createdStore;
}

import stateMachine from './stateMachine';
import eventLogger from './eventLogger';
import * as TYPES from './types';

/**
* @param {function} reducer - see the reducers in the examples directory. Manipulates the current
* state and returns a new version of state.
* @param {object} initialState - whatever state you want to intialise your store with.
*/

export function createStore({ reducer, initialState }): TYPES.IVanduxStore {
  const vanduxInternals: TYPES.IVanduxInternals = {};

  vanduxInternals.makeStore = (): TYPES.IVanduxStore => {
    const store = stateMachine();
    const events: TYPES.Events = {};
    const isDebug: boolean = (window.location.search.indexOf('vandux-debug') > -1); // if location has '?vandux-debug' - true

    const doInitialRender = (renderFunction: TYPES.RenderFunction, el: Element): void => {
      // Calculate initial state
      const newState = reducer(initialState, { type: 'INIT' });
      // Set store to calculated state
      store.setState(newState);
      // Report events in browser console if window.location has `?vandux-debug`
      if (isDebug) eventLogger(el, 'INIT', initialState);
      // Call passed in render function with the calculated state.
      renderFunction(newState, el, 'INIT', vanduxInternals.createdStore);
    };

    return {
      subscribe: (eventType: string, subscriptionFunc: TYPES.SubscriptionFunction): void => {
        // Add a new `eventType` key with an array to pop SubscribeFunction's into, if it doesn't exist
        if (!events.hasOwnProperty.call(events, eventType)) events[eventType] = [];
        // Pop desired SubscribeFunction into `eventType`s array
        events[eventType].push(subscriptionFunc);
      },

      unSubscribe: (eventType: string): void => {
        // Delete given `eventType` off of `events` object. Kills all `SubscribeFunction`s under `eventType`
        delete events[eventType];
      },

      connect: (eventsTypesToSubscribe: ReadonlyArray<string>, el: Element, renderFunction: TYPES.RenderFunction): TYPES.IConnectedStore => {
        // Setup subscription relationships for eventTypes to render functions
        eventsTypesToSubscribe.forEach((evtType: string): void => {
          /**
          * "vanduxInternals.createdStore.subscribe" creates a subscription for each `eventsTypesToSubscribe` eventType, and creates a 
          * function of type `TYPES.SubscriptionFunction` to call, when said eventType is fired via "vanduxInternals.createdStore.publish",
          * new state object is passed into render function after processing published event payload with state through a reducer...*/
          vanduxInternals.createdStore.subscribe(evtType, (state: TYPES.State): void => {
            // `eventLogger()` is invoked when `isDebug` is true. Prints what happened, when, in the browser console.
             if (isDebug) eventLogger(el, evtType, state);
             /**
             * `renderFunction()` is called during `vanduxInternals.createdStore.publish`.
             * @param {Any} state - whatever the new state is as per calculation via your reducer
             * @param {HTMLDOMElement} el - a dom reference that marks the bounds of your component
             * @param {string} evtType - the event that was fired
             * @param {IVanduxStore} vanduxInternals.createdStore - a reference to the store interface*/
            renderFunction(state, el, evtType, vanduxInternals.createdStore);
          });
        });
        // Does first render with `initialState` (`initialState` is inherited from function closure)
        doInitialRender(renderFunction, el);
        // return vandux interface for connected component
        return {
          publish: vanduxInternals.createdStore.publish,
          subscribe: vanduxInternals.createdStore.subscribe,
          unSubscribe: vanduxInternals.createdStore.unSubscribe,
          getState: vanduxInternals.createdStore.getState
        };
      },

      publish: (eventType: string, payload: any): void | false => {
        // Exit if requested `eventType` does not exist on this store instance
        if (!events.hasOwnProperty.call(events, eventType)) return false;
        // Generate a new version of state via `reducer` (`reducer` is inherited from function closure)
        store.setState(
          reducer(store.state, { type: eventType, data: payload })
        );
        // Invoke all functions in `eventType` array
        events[eventType].forEach((subscriptionFunc): void => {
          subscriptionFunc(store.state);
        });
      },

      getState: (): TYPES.State => {
        // Returns current state
        return store.state;
      }
    };
  };

  vanduxInternals.createdStore = vanduxInternals.makeStore();

  return vanduxInternals.createdStore;
}

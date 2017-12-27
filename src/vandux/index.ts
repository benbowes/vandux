import stateMachine from './stateMachine';
import eventLogger from './eventLogger';
import { RenderFunction, SubscriptionFunction, VanduxInternals, Events } from './types';

/**
* @param {function} reducer - see the reducers in the examples directory. Manipulates the current
* state and returns a new version of state.
* @param {object} initialState - whatever state you want to intialise your store with.
*/

export function createStore({ reducer, initialState }) {

  const vanduxInternals: VanduxInternals = {};

  vanduxInternals.makeStore = () => {
    const store = stateMachine();
    const events: Events = {};
    const isDebug: boolean = (window.location.search.indexOf('vandux-debug') > -1); // if location has '?vandux-debug' - true

    const doInitialRender = (renderFunction: RenderFunction, el: Element): void => {
      const newState = reducer(initialState, { type: 'INIT' }); // Calculate initial state
      store.setState(newState); // Set store to calculated state
      // Report in browser console if window.location has `?vandux-debug`
      if (isDebug) eventLogger(el, 'INIT', initialState);
      // Call passed in render function with the calculated state.
      renderFunction(newState, el, 'INIT', vanduxInternals.createdStore);
    };

    return {

      subscribe: (eventType: string, subscriptionFunc: SubscriptionFunction) => {
        // Add a new `eventType` key with an array to pop SubscribeFunction's into, if it doesn't exist
        if (!events.hasOwnProperty.call(events, eventType)) events[eventType] = [];
        // Pop desired SubscribeFunction into `eventType`s array
        events[eventType].push(subscriptionFunc);
      },

      unSubscribe: (eventType: string) => {
        // Delete given `eventType` off `events`. Kills all `SubscribeFunction`s under `eventType`
        delete events[eventType];
      },

      connect: (eventsTypesToSubscribe: Array<string>, el: Element, renderFunction: RenderFunction) => {
        // Setup subscriptions for eventTypes to render functions
        eventsTypesToSubscribe.forEach((evtType: string) => {
          vanduxInternals.createdStore.subscribe(evtType, (state: any) => {
            if (isDebug) eventLogger(el, evtType, state);
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

      publish: (eventType: string, payload: any) => {
        // Exit if requested `eventType` does not exist on this store instance
        if (!events.hasOwnProperty.call(events, eventType)) return false;
        // Generate a new version of state via `reducer` (`reducer` is inherited from function closure)
        store.setState(
          reducer(store.state, { type: eventType, data: payload })
        );
        // Invoke all functions in `eventType` array
        events[eventType].forEach(subscriptionFunc => {
          subscriptionFunc(store.state);
        });
      },

      getState: () => {
        // Returns current state
        return store.state;
      }
    };
  };

  vanduxInternals.createdStore = vanduxInternals.makeStore();

  return vanduxInternals.createdStore;
}

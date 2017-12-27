export type State = any;
export type InitialState = any;

export type SubscriptionFunction = (state:State) => void;
export type RenderFunction = (state:State, el:Element, eventType:string, store:ConnectedStore) => void;
export type PublishFunction = (eventType:string, payload:any) => void;
export type ConnectFunction = (eventsTypesToSubscribe:string[], el:Element, renderFunction:RenderFunction) => ConnectedStore;
export type SubscribeFunction = (eventType:string, subscriptionFunc:SubscriptionFunction) => void;
export type UnSubscribeFunction = (eventType:string) => void;
export type GetStateFunction = () => State;

export type ConnectedStore = undefined | {
  getState: GetStateFunction,
  subscribe: SubscribeFunction,
  unSubscribe: UnSubscribeFunction,
  publish: PublishFunction
}

export type VanduxStore = {
  getState: GetStateFunction,
  subscribe: SubscribeFunction,
  unSubscribe: UnSubscribeFunction,
  publish: PublishFunction,
  connect: ConnectFunction
}

export type Context = {
  makeStore: undefined | (() => VanduxStore),
  createdStore: undefined | VanduxStore
}

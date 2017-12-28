export type State = any;

export type InitialState = any;

export type SubscriptionFunction = (state: State) => void;

export type RenderFunction = (
  state: State,
  el: Element,
  eventType: string,
  store: IConnectedStore
) => void;

export type PublishFunction = (
  eventType: string,
  payload: any
) => void;

export type ConnectFunction = (
  eventsTypesToSubscribe: ReadonlyArray<string>,
  el: Element,
  renderFunction: RenderFunction
) => IConnectedStore;

export type SubscribeFunction = (
  eventType: string,
  subscriptionFunc: SubscriptionFunction
) => void;

export type UnSubscribeFunction = (eventType: string) => void;

export type GetStateFunction = () => State;

export type Events = {
  [event: string]: Array<SubscriptionFunction>;
};

export interface IConnectedStore {
  getState: GetStateFunction,
  subscribe: SubscribeFunction,
  unSubscribe: UnSubscribeFunction,
  publish: PublishFunction
}

export interface IVanduxStore {
  getState: GetStateFunction,
  subscribe: SubscribeFunction,
  unSubscribe: UnSubscribeFunction,
  publish: PublishFunction,
  connect: ConnectFunction
}

export interface IVanduxInternals {
  makeStore?: (() => IVanduxStore),
  createdStore?: IVanduxStore
}

export interface IStateMachine {
  setState: (newState: State) => State,
  state: () => State
}
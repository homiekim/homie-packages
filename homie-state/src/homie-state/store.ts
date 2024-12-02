export type CallBack<T> = (prevState: T) => T;

export interface State<T> {
  set: (param: CallBack<T> | T) => void;
  get: () => T;
  subscribe: (listener: () => void) => () => void;
  emit: () => void;
  getServerSnapshot?: () => T;
}

export function createStateManager<T>(initialState: T): State<T> {
  let state = initialState;
  const listeners = new Set<() => void>();

  const set = (param: CallBack<T> | T) => {
    if (param instanceof Function) {
      state = param(state);
    } else {
      state = param;
    }
    emit();
  };

  const get = () => state;
  const getServerSnapshot = () => state;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return { set, get, subscribe, emit, getServerSnapshot };
}

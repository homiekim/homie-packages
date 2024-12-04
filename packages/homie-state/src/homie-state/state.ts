import { useSyncExternalStore } from "react";
import { createStateManager, State, CallBack } from "./store";

export const store = <T>(initialState: T) => {
  return createStateManager(initialState);
};

export const useExternalState = <T>(
  store: State<T>
): [T, (param: CallBack<T> | T) => void] => {
  const { subscribe, get, set, getServerSnapshot } = store;
  const state = useSyncExternalStore(
    subscribe,
    get,
    getServerSnapshot ? getServerSnapshot : get
  );
  return [state, set];
};

export const useSetExternalState = <T>(store: State<T>) => {
  const { set } = store;
  return set;
};

export const useExternalValue = <T>(store: State<T>) => {
  const { subscribe, get, getServerSnapshot } = store;
  const state = useSyncExternalStore(
    subscribe,
    get,
    getServerSnapshot ? getServerSnapshot : get
  );
  return state;
};

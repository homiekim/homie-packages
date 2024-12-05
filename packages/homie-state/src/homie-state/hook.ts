import {
  store,
  useExternalState,
  useExternalValue,
  useSetExternalState,
} from "./state";
import { State } from "./store";

export const createStores = <T extends Object>(initialStates: T) => {
  const stores = Object.entries(initialStates).reduce(
    (acc, [key, value]) => {
      acc[key as keyof T] = store(value);
      return acc;
    },
    {} as Record<keyof T, State<T>>
  );

  const getHomie = (key: keyof T) => {
    const _store = stores[key];
    return useExternalState(_store);
  };

  const getHomieValue = (key: keyof T) => {
    const _store = stores[key];
    return useExternalValue(_store);
  };

  const getHomieSetter = (key: keyof T) => {
    const _store = stores[key];
    return useSetExternalState(_store);
  };

  const getHomies = () => {
    return stores;
  };

  return { getHomie, getHomieValue, getHomieSetter, getHomies };
};

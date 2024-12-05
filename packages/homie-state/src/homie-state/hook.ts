import {
  store,
  useExternalState,
  useExternalValue,
  useSetExternalState,
} from "./state";
import { State } from "./store";

type Stores<T extends Record<string, any>> = {
  [K in keyof T]: State<T[K]>;
};

function createStoreManager<T extends Record<string, any>>() {
  let stores: Stores<T> | null = null;

  return {
    initialize(initialStates: T): void {
      if (stores) {
        throw new Error("Stores have already been initialized.");
      }

      stores = Object.keys(initialStates).reduce((acc, key) => {
        const typedKey = key as keyof T;
        acc[typedKey] = store(initialStates[typedKey]);
        return acc;
      }, {} as Stores<T>);
    },
    getStores(): Stores<T> {
      if (!stores) {
        throw new Error(
          "Stores have not been initialized. Please call initialize first."
        );
      }
      return stores;
    },
  };
}

const storeManager = createStoreManager<any>();

export function createHomies<T extends Record<string, any>>(
  initialStates: T
): void {
  storeManager.initialize(initialStates);
}

export function getHomie<T extends Record<string, any>, K extends keyof T>(
  key: K
): [T[K], (param: T[K] | ((prev: T[K]) => T[K])) => void] {
  const stores = storeManager.getStores();
  const targetStore = stores[key];
  return useExternalState(targetStore);
}

export function getHomieValue<T extends Record<string, any>, K extends keyof T>(
  key: K
): T[K] {
  const stores = storeManager.getStores();
  const targetStore = stores[key];
  return useExternalValue(targetStore);
}

export function getHomieSetter<
  T extends Record<string, any>,
  K extends keyof T,
>(key: K): (param: T[K] | ((prev: T[K]) => T[K])) => void {
  const stores = storeManager.getStores();
  const targetStore = stores[key];
  return useSetExternalState(targetStore);
}

export function getAllHomies<T extends Record<string, any>>(): {
  [K in keyof T]: T[K];
} {
  const stores = storeManager.getStores();
  return Object.keys(stores).reduce(
    (acc, key) => {
      const typedKey = key as keyof T;
      acc[typedKey] = stores[typedKey].get();
      return acc;
    },
    {} as { [K in keyof T]: T[K] }
  );
}

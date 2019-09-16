import MainStore from './main';

const isServer = typeof window == 'undefined';
let store = null;

const mainStore = new MainStore({});
export type StoreType = typeof mainStore;

export function initializeStore(initialData) {
  if (isServer) {
    return new MainStore(initialData);
  }
  if (store === null) {
    store = new MainStore(initialData);
  }
  return store;
}

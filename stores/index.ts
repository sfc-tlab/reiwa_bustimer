import MainStore from './main';

const isServer = !process.browser;
let store = null;

export function initializeStore(initialData) {
  if (isServer) {
    return new MainStore(isServer, initialData);
  }
  if (store === null) {
    store = new MainStore(isServer, initialData);
  }
  return store;
}

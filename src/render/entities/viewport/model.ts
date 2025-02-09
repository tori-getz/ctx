import { createEvent, createStore, sample } from "effector";

export const $canGoBack = createStore<boolean>(false, { name: 'can go back' });
export const $canGoForward = createStore<boolean>(false, { name: 'can go back' });

export const canGoBackSetted = createEvent<boolean>('can go back setted');
export const canGoForwardSetted = createEvent<boolean>('can go forward setted');
export const loadingSetted = createEvent<boolean>('loading setted');

export const goBack = createEvent<void>('go back');
export const goForward = createEvent<void>('go forward');

export const pageRefreshed = createEvent<void>('page refreshed');
export const pageRefreshStopped = createEvent<void>('page refresh stopped');

sample({
  source: canGoBackSetted,
  target: $canGoBack,
});

sample({
  source: canGoForwardSetted,
  target: $canGoForward,
});

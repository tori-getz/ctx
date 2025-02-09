import { combine, createEvent, createStore, sample } from 'effector';
import { v4 as uuid } from 'uuid';
import { Tab } from './schemas';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { IUpdateTabIconPayload, IUpdateTabLoadingPayload, IUpdateTabTitlePayload, IUpdateTabUrlPayload } from './types';

export const $tabs = createStore<Tab[]>([], { name: 'tabs' });
export const $activeTab = createStore<string>('', { name: 'active tab' });

export const tabAdded = createEvent<string>('tab added');
export const tabClosed = createEvent<string>('tab closed');
export const tabsMoved = createEvent<DragEndEvent>('tabs moved');
export const tabSelected = createEvent<string>('select active tab');
export const tabUrlEntered = createEvent<string>('tab url entered');
export const tabUrlUpdated = createEvent<IUpdateTabUrlPayload>('tab url updated');
export const tabTitleUpdated = createEvent<IUpdateTabTitlePayload>('tab title updated');
export const tabIconUpdated = createEvent<IUpdateTabIconPayload>('tab icon updated');
export const tabLoading = createEvent<IUpdateTabLoadingPayload>('tab loading');

$tabs.on(tabAdded, (tabs, name) => [
  ...tabs,
  {
    id: uuid(),
    name,
    url: '',
    icon: '',
    loading: false,
  },
]);

$tabs.on(tabClosed, (tabs, tabId) => {
  return [...tabs].filter(tab => tab.id !== tabId);
});

$tabs.on(tabsMoved, (items, event) => {
  const { active, over } = event;

  if (active.id === over?.id) return items;

  const oldIndex = items.findIndex((item) => item.id === active.id);
  const newIndex = items.findIndex((item) => item.id === over?.id);

  return arrayMove(items, oldIndex, newIndex);
});

sample({
  clock: tabAdded,
  source: $tabs,
  fn: (tabs) => {
    return tabs.at(-1)!.id;
  },
  target: $activeTab,
});

sample({
  clock: tabSelected,
  target: $activeTab
});

sample({
  clock: tabClosed,
  source: $tabs,
  fn: (tabs, tabId) => {
    console.log(tabs);
    return tabId;
  },
  target: $activeTab,
});

const $tabsWithActiveId = combine(
  $tabs,
  $activeTab,
  (tabs, activeTab) => [tabs, activeTab],
);

sample({
  clock: tabUrlEntered,
  source: $tabsWithActiveId,
  fn: ([tabs, activeTab]: [Tab[], string], url) => {
    return [...tabs].map((tab) => {
      if (tab.id !== activeTab) return tab;
      return {
        ...tab,
        url,
      };
    });
  },
  target: $tabs,
});

sample({
  clock: tabUrlUpdated,
  source: $tabs,
  fn: (tabs, { id, url }) => {
    return [...tabs].map((tab) => {
      if (tab.id !== id) return tab;

      return {
        ...tab,
        url,
      };
    });
  },
  target: $tabs
});

sample({
  clock: tabTitleUpdated,
  source: $tabs,
  fn: (tabs, { id, title }) => {
    return [...tabs].map((tab) => {
      if (tab.id !== id) return tab;

      return {
        ...tab,
        name: title,
      };
    });
  },
  target: $tabs
});

sample({
  clock: tabIconUpdated,
  source: $tabs,
  fn: (tabs, { id, icon }) => {
    return [...tabs].map((tab) => {
      if (tab.id !== id) return tab;

      return {
        ...tab,
        icon,
      };
    });
  },
  target: $tabs
});

sample({
  clock: tabLoading,
  source: $tabs,
  fn: (tabs, { id, loading }) => {
    return [...tabs].map((tab) => {
      if (tab.id !== id) return tab;

      return {
        ...tab,
        loading,
      };
    });
  },
  target: $tabs
});

tabAdded('Untitled');
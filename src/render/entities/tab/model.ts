import { createEvent, createStore, sample } from 'effector';
import { v4 as uuid } from 'uuid';
import { Tab } from './schemas';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const $tabs = createStore<Tab[]>([], { name: 'tabs' });
export const $activeTab = createStore<string>('', { name: 'active tab' });

export const tabAdded = createEvent<string>('tab added');
export const tabClosed = createEvent<string>('tab closed');
export const tabsMoved = createEvent<DragEndEvent>('tabs moved');
export const tabSelected = createEvent<string>('select active tab');

$tabs.on(tabAdded, (tabs, name) => [
  ...tabs,
  {
    id: uuid(),
    name,
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
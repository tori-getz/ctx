import React, { useCallback } from 'react';
import { useUnit } from 'effector-react';
import cls from './tabs.module.sass';
import {
  Tab,
  $tabs,
  $activeTab,
  tabSelected,
  tabClosed,
  tabsMoved,
} from '~/entities/tab';
import { AddTab } from '~/features/add-tab';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

export const Tabs: React.FC = () => {
  const tabs = useUnit($tabs);
  const [activeTab, selectTab] = useUnit([$activeTab, tabSelected]);
  const closeTab = useUnit(tabClosed);
  const moveTabs = useUnit(tabsMoved);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = useCallback((event: DragEndEvent) => {
    moveTabs(event);
  }, [moveTabs]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={tabs}
        strategy={horizontalListSortingStrategy}
      >
        <div className={cls.tabs}>
          {tabs.map((tab) => (
            <Tab
              id={tab.id}
              key={tab.id}
              title={tab.name}
              active={activeTab === tab.id}
              onClick={() => selectTab(tab.id)}
              onClose={() => {
                closeTab(tab.id);
              }}
            />
          ))}
          <AddTab />
        </div>
      </SortableContext>
    </DndContext>
  );
};

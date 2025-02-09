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
import { useNavigate } from '@tanstack/react-router';

export const Tabs: React.FC = () => {
  const tabs = useUnit($tabs);
  const [activeTab, selectTab] = useUnit([$activeTab, tabSelected]);
  const closeTab = useUnit(tabClosed);
  const moveTabs = useUnit(tabsMoved);
  const navigate = useNavigate();

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
              onClick={() => {
                selectTab(tab.id);
                if (tab.url === '') {
                  navigate({ to: '/' });
                } else {
                  navigate({ to: '/browse' });
                }
              }}
              onClose={() => {
                closeTab(tab.id);
              }}
              icon={tab.icon}
              loading={tab.loading}
              disableClose={tabs.length === 1}
            />
          ))}
          <AddTab />
        </div>
      </SortableContext>
    </DndContext>
  );
};

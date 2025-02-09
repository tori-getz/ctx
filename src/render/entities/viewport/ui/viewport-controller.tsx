import React from "react";
import { useUnit } from "effector-react";
import { $tabs, useCurrentTab } from "~/entities/tab";
import { Viewport } from "./viewport";
import cls from './viewport-controller.module.sass';

export const ViewportController: React.FC = () => {
  const tabs = useUnit($tabs);
  const currentTab = useCurrentTab();

  return (
    <div className={cls['viewport-controller']}>
      {tabs.map((tab) => {
        return (
          <Viewport
            id={tab.id}
            key={tab.id}
            url={tab.url}
            visible={currentTab?.id === tab.id}
          />
        );
      })}
    </div>
  );
};

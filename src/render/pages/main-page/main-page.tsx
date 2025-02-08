import React from "react";
import cls from './main-page.module.sass';
import { Tabs } from "~/widgets/tabs";

export const MainPage: React.FC = () => {
  return (
    <div className={cls['main-page']}>
      <Tabs />
      main page
    </div>
  );
};

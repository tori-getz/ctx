import React from "react";
import cls from './main-page.module.sass';
import { Tabs } from "~/widgets/tabs";
import { AddressPanel } from "~/widgets/address-panel";

export const MainPage: React.FC = () => {
  return (
    <div className={cls['main-page']}>
      <Tabs />
      <AddressPanel />
      main page
    </div>
  );
};

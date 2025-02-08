import React from "react";
import cls from './address-panel.module.sass';
import { NavigateHistory } from "~/features/navigate-history";
import { RefreshPage } from "~/features/refresh-page";
import { AddressStroke } from "~/features/address-stroke";

export const AddressPanel: React.FC = () => {
  return (
    <div className={cls['address-panel']}>
      <NavigateHistory />
      <RefreshPage />
      <AddressStroke />
    </div>
  );
};

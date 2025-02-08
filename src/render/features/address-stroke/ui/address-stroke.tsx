import React from "react";
import cls from './address-stroke.module.sass';

export const AddressStroke: React.FC = () => {
  return (
    <input
      placeholder="Enter address"
      className={cls['address-stroke']}
    />
  );
};

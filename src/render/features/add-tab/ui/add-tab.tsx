import { useUnit } from "effector-react";
import React from "react";
import cls from './add-tab.module.sass';
import { MdAdd } from 'react-icons/md';
import { tabAdded } from "~/entities/tab";

export const AddTab: React.FC = () => {
  const addTab = useUnit(tabAdded);
  
  return (
    <button className={cls['add-tab']} onClick={() => addTab('Untitled')}>
      <MdAdd />
    </button>
  );
};
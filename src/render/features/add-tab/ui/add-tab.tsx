import { useUnit } from "effector-react";
import React, { useCallback } from "react";
import cls from './add-tab.module.sass';
import { MdAdd } from 'react-icons/md';
import { tabAdded } from "~/entities/tab";
import { useNavigate } from "@tanstack/react-router";

export const AddTab: React.FC = () => {
  const addTab = useUnit(tabAdded);
  const navigate = useNavigate();

  const handleAddTab = useCallback(() => {
    addTab('Untitled')
    navigate({ to: '/' });
  }, [addTab]);
  
  return (
    <button className={cls['add-tab']} onClick={handleAddTab}>
      <MdAdd />
    </button>
  );
};
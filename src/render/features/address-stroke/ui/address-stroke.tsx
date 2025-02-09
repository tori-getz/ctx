import React, { useEffect, useState } from "react";
import cls from './address-stroke.module.sass';
import { useUnit } from "effector-react";
import { useKeyPress } from "~/shared/hooks/use-keypress";
import { getFormattedUrl } from "../lib/get-formatted-url";
import { tabUrlEntered } from "~/entities/tab/model";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentTab } from "~/entities/tab";

export const AddressStroke: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const currentTab = useCurrentTab();
  const enterTabUrl = useUnit(tabUrlEntered);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(currentTab?.url ?? 'Untitled')
  }, [currentTab]);

  useKeyPress(['Enter'], () => {
    if (!searchTerm) return;

    enterTabUrl(getFormattedUrl(searchTerm));
    navigate({ to: '/browse' });
  }, [searchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Enter address"
      className={cls['address-stroke']}
    />
  );
};

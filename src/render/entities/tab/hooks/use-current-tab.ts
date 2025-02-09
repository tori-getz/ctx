import { useUnit } from "effector-react";
import { Tab } from "../schemas";
import { $activeTab, $tabs } from "../model";
import { useMemo } from "react";

export const useCurrentTab = (): Tab | null => {
  const tabs = useUnit($tabs);
  const activeTabId = useUnit($activeTab);

  return useMemo(() => {
    return tabs.find((tab) => tab.id === activeTabId) ?? null
  }, [tabs, activeTabId]);
}; 

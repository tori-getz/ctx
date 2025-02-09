import React from 'react';
import { useUnit } from 'effector-react';
import { MdClose, MdRefresh } from 'react-icons/md';
import { Button } from '~/shared/ui';
import cls from './refresh-page.module.sass';
import { pageRefreshed, pageRefreshStopped } from '~/entities/viewport';
import { useCurrentTab } from '~/entities/tab';

export const RefreshPage: React.FC = () => {
  const refreshPage = useUnit(pageRefreshed);
  const stopPageRefresh = useUnit(pageRefreshStopped);

  const currentTab = useCurrentTab();

  if (currentTab?.loading) {
    return (
      <Button onClick={stopPageRefresh} className={cls.button}>
        <MdClose size={18} />
      </Button>
    );  
  }

  return (
    <Button onClick={refreshPage} className={cls.button}>
      <MdRefresh size={18} />
    </Button>
  );
};

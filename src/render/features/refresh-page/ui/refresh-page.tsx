import React from 'react';
import { MdRefresh } from 'react-icons/md';
import { Button } from '~/shared/ui';
import cls from './refresh-page.module.sass';

export const RefreshPage: React.FC = () => {
  return (
    <Button className={cls.button}>
      <MdRefresh size={18} />
    </Button>
  );
};
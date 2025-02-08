import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Button } from '~/shared/ui';
import cls from './navigate-history.module.sass';

export const NavigateHistory: React.FC = () => {
  return (
    <>
      <Button className={cls.button}>
        <MdArrowBack size={18} />
      </Button>
      <Button className={cls.button}>
        <MdArrowForward size={18} />
      </Button>
    </>
  );
};
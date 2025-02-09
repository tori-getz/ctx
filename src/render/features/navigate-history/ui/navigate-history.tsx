import React from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Button } from '~/shared/ui';
import cls from './navigate-history.module.sass';
import { useUnit } from 'effector-react';
import { $canGoBack, $canGoForward, goBack, goForward } from '~/entities/viewport';

export const NavigateHistory: React.FC = () => {
  const [canGoBack, canGoForward] = useUnit([$canGoBack, $canGoForward]);
  const [back, forward] = useUnit([goBack, goForward]);
  return (
    <>
      <Button
        className={cls.button}
        disabled={!canGoBack}
        onClick={back}
      >
        <MdArrowBack size={18} />
      </Button>
      <Button
        className={cls.button}
        disabled={!canGoForward}
        onClick={forward}
      >
        <MdArrowForward size={18} />
      </Button>
    </>
  );
};
import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import cls from './browse-page.module.sass';
import { ViewportController } from '~/entities/viewport/ui/viewport-controller';

const BrowsePage: React.FC = () => {
  return (
    <div className={cls['browse-page']}>
      <ViewportController />
    </div>
  );
};

export const Route = createFileRoute('/browse/')({
  component: BrowsePage,
})

import React, { Suspense } from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { AddressPanel } from '~/widgets/address-panel';
import { Tabs } from '~/widgets/tabs';
import cls from './root.module.sass';

const TanStackRouterDevtools =
  import.meta.env.MODE === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <div className={cls.root}>
        <Tabs />
        <AddressPanel />
        <Outlet />
      </div>
    </>
  ),
});
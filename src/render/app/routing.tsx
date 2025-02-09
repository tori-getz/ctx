import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from '~/shared/router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const Routing: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
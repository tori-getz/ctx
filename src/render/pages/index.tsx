import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import cls from './home-page.module.sass';

export const HomePage: React.FC = () => {
  return (
    <div className={cls['home-page']}>
      <h1>home page</h1>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});
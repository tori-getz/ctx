import React, { useEffect } from "react";
import '@fontsource/inter';
import './style.sass';
import { Routing } from './routing';
import { getPlatformFx } from "~/entities/platform";

export const App: React.FC = () => {
  useEffect(() => {
    getPlatformFx();
  }, []);

  return (
    <>
      <Routing />
    </>
  );
};

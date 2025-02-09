import React from "react";
import cls from './window-controls.module.sass';
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from "react-icons/vsc";
import { Platform, usePlatform } from "~/entities/platform";
import { windowClosedFx, windowMaximizedFx, windowMinimizedFx } from "../model";

export const WindowControls: React.FC = () => {
  const platform = usePlatform();

  if (platform === Platform.Darwin) return null;

  return (
    <div className={cls.controls}>
      <button className={cls.controls__button} onClick={() => windowClosedFx()}>
        <VscChromeMinimize />
      </button>
      <button className={cls.controls__button} onClick={() => windowMaximizedFx()}>
        <VscChromeMaximize />
      </button>
      <button className={cls.controls__button} onClick={() => windowMinimizedFx()}>
        <VscChromeClose />
      </button>
    </div>
  )
};

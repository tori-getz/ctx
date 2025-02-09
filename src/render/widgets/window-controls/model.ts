import { createEffect } from "effector";
import { closeWindow, maximizeWindow, minimizeWindow } from "./api";

export const windowClosedFx = createEffect({
  name: 'window closed fx',
  handler: closeWindow,
});

export const windowMaximizedFx = createEffect({
  name: 'window maximized fx',
  handler: maximizeWindow,
});

export const windowMinimizedFx = createEffect({
  name: 'window minimized fx',
  handler: minimizeWindow,
});

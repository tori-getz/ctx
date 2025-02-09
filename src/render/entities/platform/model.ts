import { createEffect, createStore, } from "effector";
import * as api from './api';
import { Platform } from "./types";

export const $platform = createStore<Platform>(Platform.Unknown, { name: 'platform' });

export const getPlatformFx = createEffect({
  name: 'get platform fx',
  handler: api.getPlatform,
});

$platform.on(getPlatformFx.doneData, (_, platform) => platform);

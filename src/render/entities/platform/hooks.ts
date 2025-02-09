import { useUnit } from "effector-react";
import { Platform } from "./types";
import { $platform } from "./model";

export const usePlatform = (): Platform => {
  return useUnit($platform);
};

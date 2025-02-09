import { sendMsg } from '~/shared/bridge';
import { Platform } from './types';

export const getPlatform = async (): Promise<Platform> => {
  const platform = await sendMsg('platform.getPlatform');
  return platform as Platform;
};

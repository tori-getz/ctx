import { sendMsg } from '~/shared/bridge';

export const closeWindow = async (): Promise<void> => {
  await sendMsg('window.close');
};

export const maximizeWindow = async (): Promise<void> => {
  await sendMsg('window.maximize');
};

export const minimizeWindow = async (): Promise<void> => {
  await sendMsg('window.minimize');
};

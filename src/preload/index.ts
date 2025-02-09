import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
  'electron',
  {
    sendMsg: (channel: string, msg?: string): Promise<string> => ipcRenderer.invoke(channel, msg),
    onReplyMsg: (cb: (msg: string) => any) => ipcRenderer.on('reply-msg', (_e, msg: string) => {
      cb(msg)
    }),
  },
)

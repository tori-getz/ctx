import { join } from 'node:path'
import { ElectronModule } from '@doubleshot/nest-electron'
import { Module } from '@nestjs/common'
import { app, BrowserWindow } from 'electron'
import { PlatformModule } from './platform/platform.module'
import { WindowModule } from './window/window.module'

@Module({
  imports: [
    ElectronModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const isDev = !app.isPackaged
        const win = new BrowserWindow({
          width: 1024,
          height: 768,
          autoHideMenuBar: true,
          titleBarStyle: 'hidden',
          trafficLightPosition: {
            x: 15,
            y: 12,
          },
          webPreferences: {
            devTools: isDev,
            contextIsolation: true,
            webviewTag: true,
            preload: join(__dirname, '../preload/index.js'),
          },
        })

        win.on('closed', () => {
          win.destroy()
        })

        const URL = isDev
          ? process.env.DS_RENDERER_URL
          : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

        win.loadURL(URL!);

        return { win }
      },
    }),
    PlatformModule,
    WindowModule,
  ],
  controllers: [],
  providers: [],
  exports: [ElectronModule],
})
export class AppModule { }

import { IpcHandle, Window } from "@doubleshot/nest-electron";
import { Controller, Logger } from "@nestjs/common";
import { BrowserWindow } from "electron";

@Controller()
export class WindowController {
  public logger: Logger = new Logger(WindowController.name);

  public constructor(
    @Window('main') private readonly mainWindow: BrowserWindow,
  ) {}

  @IpcHandle('window.close')
  public close() {
    this.logger.log(`call window.close. Closing...`);
    this.mainWindow.close();
  }
  
  @IpcHandle('window.maximize')
  public maximize() {
    this.logger.log(`call window.maximize, Maximizing...`);
    this.mainWindow.maximize();
  }

  @IpcHandle('window.minimize')
  public minimize() {
    this.logger.log(`call window.minimize. Minimizing...`);
    this.mainWindow.minimize();
  }
}

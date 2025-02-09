import { IpcHandle } from "@doubleshot/nest-electron";
import { Controller, Logger } from "@nestjs/common";

@Controller()
export class PlatformController {
  public logger: Logger = new Logger(PlatformController.name);
  @IpcHandle('platform.getPlatform')
  public async getPlatform(): Promise<string> {
    const { platform } = process;
    this.logger.log(`call platform.getPlatform. Response: ${platform}`)
    return platform;
  }
}

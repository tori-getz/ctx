import { Module } from "@nestjs/common";
import { PlatformController } from "./platform.controller";
import { ElectronModule } from "@doubleshot/nest-electron";

@Module({
  imports: [ElectronModule],
  controllers: [
    PlatformController,
  ],
})
export class PlatformModule {}
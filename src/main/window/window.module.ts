import { Module } from "@nestjs/common";
import { WindowController } from "./window.controller";
import { ElectronModule } from "@doubleshot/nest-electron";

@Module({
  imports: [ElectronModule],
  controllers: [
    WindowController
  ]
})
export class WindowModule {}
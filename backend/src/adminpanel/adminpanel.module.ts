import { Module } from '@nestjs/common';
import { AdminpanelController } from './adminpanel.controller';
import { ReportesModule } from '../modules/reportes/reportes.module';

@Module({
  imports: [ReportesModule],
  controllers: [AdminpanelController],
})
export class AdminpanelModule {}

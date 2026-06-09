import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalleresService } from './talleres.service';
import { TalleresController } from './talleres.controller';
import { AdminTalleresController } from './admin-talleres.controller';
import { Taller } from '../../database/entities/taller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taller])],
  controllers: [TalleresController, AdminTalleresController],
  providers: [TalleresService],
  exports: [TalleresService],
})
export class TalleresModule {}

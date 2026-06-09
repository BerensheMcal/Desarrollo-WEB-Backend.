import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { ReservaTaller } from '../../database/entities/reserva-taller.entity';
import { TalleresModule } from '../talleres/talleres.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaTaller]), TalleresModule],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}

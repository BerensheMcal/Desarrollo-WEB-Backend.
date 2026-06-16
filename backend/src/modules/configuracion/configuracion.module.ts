import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionService } from './configuracion.service';
import { AdminConfiguracionController } from './admin-configuracion.controller';
import { Configuracion } from '../../database/entities/configuracion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Configuracion])],
  controllers: [AdminConfiguracionController],
  providers: [ConfiguracionService],
  exports: [ConfiguracionService],
})
export class ConfiguracionModule {}

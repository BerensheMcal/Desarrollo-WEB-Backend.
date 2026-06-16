import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Usuario } from '../entities/usuario.entity';
import { Configuracion } from '../entities/configuracion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Configuracion])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

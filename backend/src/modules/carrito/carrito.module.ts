import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from '../../database/entities/carrito.entity';
import { ItemCarrito } from '../../database/entities/item-carrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, ItemCarrito])],
  controllers: [CarritoController],
  providers: [CarritoService],
  exports: [CarritoService],
})
export class CarritoModule {}

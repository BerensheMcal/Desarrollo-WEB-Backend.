import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AdminProductosController } from './admin-productos.controller';
import { Producto } from '../../database/entities/producto.entity';
import { ImagenProducto } from '../../database/entities/imagen-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, ImagenProducto])],
  controllers: [ProductosController, AdminProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { AdminOrdenesController } from './admin-ordenes.controller';
import { Orden } from '../../database/entities/orden.entity';
import { DetalleOrden } from '../../database/entities/detalle-orden.entity';
import { CarritoModule } from '../carrito/carrito.module';
import { ConfiguracionModule } from '../configuracion/configuracion.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, DetalleOrden]), CarritoModule, ConfiguracionModule, ProductosModule],
  controllers: [OrdenesController, AdminOrdenesController],
  providers: [OrdenesService],
  exports: [OrdenesService],
})
export class OrdenesModule {}

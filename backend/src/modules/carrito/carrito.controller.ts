import { Controller, Get, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('carrito')
@UseGuards(JwtAuthGuard)
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get()
  obtener(@Req() req: any) {
    return this.carritoService.obtenerOcrear(req.user.id);
  }

  @Post('agregar/:productoId/:cantidad')
  agregar(@Req() req: any, @Param('productoId') productoId: number, @Param('cantidad') cantidad: number) {
    return this.carritoService.agregarItem(req.user.id, productoId, cantidad);
  }

  @Delete('item/:itemId')
  eliminarItem(@Req() req: any, @Param('itemId') itemId: number) {
    return this.carritoService.eliminarItem(req.user.id, itemId);
  }

  @Delete()
  vaciar(@Req() req: any) {
    return this.carritoService.vaciar(req.user.id);
  }
}

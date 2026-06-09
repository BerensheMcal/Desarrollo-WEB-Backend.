import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  listar(@Query('categoria') categoria?: number) {
    if (categoria) return this.productosService.buscarPorCategoria(categoria);
    return this.productosService.listar();
  }

  @Get('destacados')
  destacados() {
    return this.productosService.listarDestacados();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.productosService.buscarPorId(id);
  }
}

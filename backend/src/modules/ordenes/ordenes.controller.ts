import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CrearOrdenDto } from './dto/crear-orden.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ordenes')
@UseGuards(JwtAuthGuard)
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Get()
  listar(@Req() req: any) {
    return this.ordenesService.listarPorUsuario(req.user.id);
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.ordenesService.buscarPorId(id);
  }

  @Post()
  crear(@Req() req: any, @Body() dto: CrearOrdenDto) {
    return this.ordenesService.crear(req.user.id, dto.items, dto.direccionEnvio, dto.metodoPago);
  }
}

import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario, EstadoOrden } from '../../database/entities';

@Controller('adminpanel/ordenes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class AdminOrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Get()
  listar() {
    return this.ordenesService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.ordenesService.buscarPorId(id);
  }

  @Patch(':id/estado')
  actualizarEstado(@Param('id') id: number, @Body('estado') estado: EstadoOrden) {
    return this.ordenesService.actualizarEstado(id, estado);
  }
}

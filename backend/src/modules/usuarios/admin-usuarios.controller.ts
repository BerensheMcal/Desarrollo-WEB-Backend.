import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';

@Controller('adminpanel/usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Roles(RolUsuario.ADMIN, RolUsuario.STAFF)
  listar() {
    return this.usuariosService.listar();
  }

  @Get('clientes')
  @Roles(RolUsuario.ADMIN, RolUsuario.STAFF)
  listarClientes() {
    return this.usuariosService.listarClientes();
  }

  @Get('frecuentes')
  @Roles(RolUsuario.ADMIN)
  clientesFrecuentes() {
    return this.usuariosService.obtenerEstadisticasClientesFrecuentes();
  }

  @Get(':id')
  @Roles(RolUsuario.ADMIN, RolUsuario.STAFF)
  buscarPorId(@Param('id') id: number) {
    return this.usuariosService.buscarPorId(id);
  }

  @Post()
  @Roles(RolUsuario.ADMIN, RolUsuario.STAFF)
  crear(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  actualizar(@Param('id') id: number, @Body() dto: ActualizarUsuarioDto) {
    return this.usuariosService.actualizar(id, dto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN, RolUsuario.STAFF)
  eliminar(@Param('id') id: number) {
    return this.usuariosService.eliminarSuave(id);
  }
}

import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';

@Controller('adminpanel/configuracion')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class AdminConfiguracionController {
  constructor(private readonly configService: ConfiguracionService) {}

  @Get()
  listar() {
    return this.configService.listarTodas();
  }

  @Put()
  async actualizar(@Body() body: { clave: string; valor: string }) {
    await this.configService.establecer(body.clave, body.valor);
    return { message: 'Configuración actualizada' };
  }
}

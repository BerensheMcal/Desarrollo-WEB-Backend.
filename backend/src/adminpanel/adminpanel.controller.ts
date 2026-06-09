import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolUsuario } from '../database/entities/usuario.entity';
import { ReportesService } from '../modules/reportes/reportes.service';

@Controller('adminpanel')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class AdminpanelController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('dashboard')
  async dashboard() {
    return this.reportesService.obtenerDatosDashboard();
  }
}

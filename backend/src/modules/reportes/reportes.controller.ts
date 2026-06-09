import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportesService } from './reportes.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';

@Controller('adminpanel/reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('dashboard')
  async dashboard() {
    return this.reportesService.obtenerDatosDashboard();
  }

  @Get('descargar')
  async descargar(@Query('formato') formato: string, @Res() res: Response) {
    if (formato === 'pdf') {
      const pdf = await this.reportesService.generarReporteVentas('pdf');
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reporte-ventas.pdf"',
      });
      res.send(pdf);
    } else {
      const data = await this.reportesService.obtenerDatosDashboard();
      res.json(data);
    }
  }
}

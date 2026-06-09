import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('reservas')
@UseGuards(JwtAuthGuard)
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  listar(@Req() req: any) {
    return this.reservasService.listarPorUsuario(req.user.id);
  }

  @Post(':tallerId/:cantidad')
  crear(@Req() req: any, @Param('tallerId') tallerId: number, @Param('cantidad') cantidad: number) {
    return this.reservasService.crear(req.user.id, tallerId, cantidad);
  }

  @Post(':id/cancelar')
  cancelar(@Param('id') id: number) {
    return this.reservasService.cancelar(id);
  }
}

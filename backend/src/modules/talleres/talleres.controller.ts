import { Controller, Get, Param } from '@nestjs/common';
import { TalleresService } from './talleres.service';

@Controller('talleres')
export class TalleresController {
  constructor(private readonly talleresService: TalleresService) {}

  @Get()
  listar() {
    return this.talleresService.listarActivos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number) {
    return this.talleresService.buscarPorId(id);
  }
}

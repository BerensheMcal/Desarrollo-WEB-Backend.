import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { TalleresService } from './talleres.service';
import { CrearTallerDto } from './dto/crear-taller.dto';
import { ActualizarTallerDto } from './dto/actualizar-taller.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';

@Controller('adminpanel/talleres')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class AdminTalleresController {
  constructor(private readonly talleresService: TalleresService) {}

  @Get()
  listar() {
    return this.talleresService.listar();
  }

  @Post()
  crear(@Body() dto: CrearTallerDto) {
    const data: any = {
      ...dto,
      fechaInicio: new Date(dto.fechaInicio),
      fechaFin: new Date(dto.fechaFin),
    };
    return this.talleresService.crear(data);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, nombre);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new Error('Solo imágenes (jpg, jpeg, png, gif, webp)'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  actualizar(@Param('id') id: number, @Body() body: any, @UploadedFile() archivo?: Express.Multer.File) {
    const data: any = {};
    if (body.nombre !== undefined) data.nombre = body.nombre;
    if (body.descripcion !== undefined) data.descripcion = body.descripcion;
    if (body.fechaInicio) data.fechaInicio = new Date(body.fechaInicio);
    if (body.fechaFin) data.fechaFin = new Date(body.fechaFin);
    if (body.horaInicio !== undefined) data.horaInicio = body.horaInicio;
    if (body.horaFin !== undefined) data.horaFin = body.horaFin;
    if (body.cuposMaximos !== undefined) data.cuposMaximos = Number(body.cuposMaximos);
    if (body.cuposDisponibles !== undefined) data.cuposDisponibles = Number(body.cuposDisponibles);
    if (body.precio !== undefined) data.precio = Number(body.precio);
    if (body.ubicacion !== undefined) data.ubicacion = body.ubicacion;
    if (archivo) data.imagenUrl = `/uploads/${archivo.filename}`;
    return this.talleresService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.talleresService.eliminarSuave(id);
  }
}

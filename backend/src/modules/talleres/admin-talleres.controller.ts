import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { TalleresService } from './talleres.service';
import { CrearTallerDto } from './dto/crear-taller.dto';
import { ActualizarTallerDto } from './dto/actualizar-taller.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';

function archivoADataUrl(archivo: Express.Multer.File): string {
  const base64 = archivo.buffer.toString('base64');
  return `data:${archivo.mimetype};base64,${base64}`;
}

/* ELIMINACION TALLERES */

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
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new Error('Solo imágenes (jpg, jpeg, png, gif, webp)'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  crear(@Body() body: any, @UploadedFile() archivo?: Express.Multer.File) {
    const data: any = {};
    if (body.nombre !== undefined) data.nombre = body.nombre;
    if (body.descripcion !== undefined) data.descripcion = body.descripcion;
    if (body.fechaInicio) data.fechaInicio = body.fechaInicio;
    if (body.fechaFin) data.fechaFin = body.fechaFin;
    if (body.horaInicio !== undefined) data.horaInicio = body.horaInicio;
    if (body.horaFin !== undefined) data.horaFin = body.horaFin;
    if (body.cuposMaximos !== undefined) data.cuposMaximos = Number(body.cuposMaximos);
    if (body.precio !== undefined) data.precio = Number(body.precio);
    if (body.ubicacion !== undefined) data.ubicacion = body.ubicacion;
    if (body.cuposDisponibles !== undefined) data.cuposDisponibles = Number(body.cuposDisponibles);
    if (archivo) data.imagenUrl = archivoADataUrl(archivo);
    return this.talleresService.crear(data);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: memoryStorage(),
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
    if (body.fechaInicio) data.fechaInicio = body.fechaInicio;
    if (body.fechaFin) data.fechaFin = body.fechaFin;
    if (body.horaInicio !== undefined) data.horaInicio = body.horaInicio;
    if (body.horaFin !== undefined) data.horaFin = body.horaFin;
    if (body.cuposMaximos !== undefined) data.cuposMaximos = Number(body.cuposMaximos);
    if (body.cuposDisponibles !== undefined) data.cuposDisponibles = Number(body.cuposDisponibles);
    if (body.precio !== undefined) data.precio = Number(body.precio);
    if (body.ubicacion !== undefined) data.ubicacion = body.ubicacion;
    if (archivo) data.imagenUrl = archivoADataUrl(archivo);
    return this.talleresService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.talleresService.eliminarSuave(id);
  }
}

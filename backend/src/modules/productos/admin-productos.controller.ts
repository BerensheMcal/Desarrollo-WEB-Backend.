import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolUsuario } from '../../database/entities/usuario.entity';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

/* ELIMINACION PRODUCTOS */

@Controller('adminpanel/productos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
export class AdminProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  listar() {
    return this.productosService.listar();
  }

  @Get('mas-vendidos')
  masVendidos() {
    return this.productosService.obtenerMasVendidos();
  }

  @Post()
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
  crear(@Body() dto: CrearProductoDto, @UploadedFile() archivo?: Express.Multer.File) {
    const data: any = { ...dto };
    if (archivo) {
      data.imagenPrincipalUrl = `/uploads/${archivo.filename}`;
    }
    return this.productosService.crear(data);
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
    if (body.precio !== undefined) data.precio = Number(body.precio);
    if (body.stock !== undefined) data.stock = Number(body.stock);
    if (body.categoriaId !== undefined) data.categoriaId = body.categoriaId ? Number(body.categoriaId) : null;
    if (archivo) data.imagenPrincipalUrl = `/uploads/${archivo.filename}`;
    return this.productosService.actualizar(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.productosService.eliminarSuave(id);
  }
}

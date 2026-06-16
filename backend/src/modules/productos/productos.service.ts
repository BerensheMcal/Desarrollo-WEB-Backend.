import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../database/entities/producto.entity';
import { ImagenProducto } from '../../database/entities/imagen-producto.entity';

/* ELIMINACION PRODUCTOS */

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(ImagenProducto)
    private readonly imagenRepo: Repository<ImagenProducto>,
  ) {}

  async listar() {
    return this.productoRepo.find({
      where: { eliminado: false },
      relations: { categoria: true, imagenes: true },
      order: { fechaCreacion: 'DESC' },
    });
  }

  async listarDestacados(limite = 8) {
    return this.productoRepo.find({
      where: { eliminado: false },
      relations: { categoria: true, imagenes: true },
      order: { fechaCreacion: 'DESC' },
      take: limite,
    });
  }

  async buscarPorId(id: number) {
    const producto = await this.productoRepo.findOne({
      where: { id, eliminado: false },
      relations: { categoria: true, imagenes: true },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async buscarPorCategoria(categoriaId: number) {
    return this.productoRepo.find({
      where: { categoriaId, eliminado: false },
      relations: { categoria: true, imagenes: true },
    });
  }

  async crear(data: Partial<Producto>) {
    const producto = this.productoRepo.create(data);
    return this.productoRepo.save(producto);
  }

  async actualizar(id: number, data: Partial<Producto>) {
    const producto = await this.buscarPorId(id);
    Object.assign(producto, data);
    return this.productoRepo.save(producto);
  }

  async eliminarSuave(id: number) {
    const producto = await this.buscarPorId(id);
    producto.eliminado = true;
    return this.productoRepo.save(producto);
  }

  async agregarImagen(productoId: number, url: string, orden = 0) {
    const imagen = this.imagenRepo.create({ productoId, url, orden });
    return this.imagenRepo.save(imagen);
  }

  async eliminarImagen(imagenId: number) {
    return this.imagenRepo.delete(imagenId);
  }

  async descontarStock(productoId: number, cantidad: number): Promise<void> {
    await this.productoRepo.decrement({ id: productoId }, 'stock', cantidad);
  }

  async aumentarStock(productoId: number, cantidad: number): Promise<void> {
    await this.productoRepo.increment({ id: productoId }, 'stock', cantidad);
  }

  async obtenerMasVendidos(limite = 10) {
    return this.productoRepo.query(`
      SELECT p.id, p.nombre, p.precio, p.imagen_principal_url,
        SUM(det.cantidad) as total_vendido,
        SUM(det.subtotal) as total_ingresos
      FROM productos p
      INNER JOIN detalles_orden det ON det.producto_id = p.id
      INNER JOIN ordenes o ON o.id = det.orden_id AND o.estado != 'CANCELADA'
      WHERE p.eliminado = false
      GROUP BY p.id, p.nombre, p.precio, p.imagen_principal_url
      ORDER BY total_vendido DESC
      LIMIT $1
    `, [limite]);
  }
}

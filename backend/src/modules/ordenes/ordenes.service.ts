import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden, EstadoOrden } from '../../database/entities/orden.entity';
import { DetalleOrden } from '../../database/entities/detalle-orden.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(DetalleOrden)
    private readonly detalleRepo: Repository<DetalleOrden>,
  ) {}

  async crear(usuarioId: number, items: { productoId: number; cantidad: number; precioUnitario: number }[], direccionEnvio?: string, metodoPago?: string) {
    const numeroOrden = `ORD-${Date.now()}-${Math.round(Math.random() * 1000)}`;
    let total = 0;
    const detalles = items.map((item) => {
      const subtotal = item.cantidad * item.precioUnitario;
      total += subtotal;
      return this.detalleRepo.create({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: item.precioUnitario, subtotal });
    });
    const orden = this.ordenRepo.create({ usuarioId, numeroOrden, total, direccionEnvio, metodoPago, detalles });
    return this.ordenRepo.save(orden);
  }

  async listarPorUsuario(usuarioId: number) {
    return this.ordenRepo.find({ where: { usuarioId }, relations: { detalles: { producto: true } }, order: { fechaCreacion: 'DESC' } });
  }

  async listarTodas() {
    return this.ordenRepo.find({ relations: { usuario: true, detalles: { producto: true } }, order: { fechaCreacion: 'DESC' } });
  }

  async buscarPorId(id: number) {
    const orden = await this.ordenRepo.findOne({ where: { id }, relations: { usuario: true, detalles: { producto: true } } });
    if (!orden) throw new NotFoundException('Orden no encontrada');
    return orden;
  }

  async actualizarEstado(id: number, estado: EstadoOrden) {
    const orden = await this.buscarPorId(id);
    orden.estado = estado;
    return this.ordenRepo.save(orden);
  }

  async obtenerIngresosPorMes() {
    return this.ordenRepo.query(`
      SELECT TO_CHAR(fecha_orden, 'YYYY-MM') as mes, SUM(total) as ingresos, COUNT(*) as total_ordenes
      FROM ordenes WHERE estado != 'CANCELADA'
      GROUP BY mes ORDER BY mes DESC LIMIT 12
    `);
  }
}

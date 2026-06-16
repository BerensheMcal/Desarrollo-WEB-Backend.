import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Orden, EstadoOrden } from '../../database/entities/orden.entity';
import { DetalleOrden } from '../../database/entities/detalle-orden.entity';
import { ConfiguracionService } from '../configuracion/configuracion.service';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(DetalleOrden)
    private readonly detalleRepo: Repository<DetalleOrden>,
    private readonly configService: ConfiguracionService,
    private readonly productosService: ProductosService,
  ) {}

  async crear(usuarioId: number, items: { productoId: number; cantidad: number; precioUnitario: number }[], direccionEnvio?: string, metodoPago?: string) {
    const numeroOrden = `ORD-${Date.now()}-${Math.round(Math.random() * 1000)}`;
    let total = 0;
    const detalles = items.map((item) => {
      const subtotal = item.cantidad * item.precioUnitario;
      total += subtotal;
      return this.detalleRepo.create({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: item.precioUnitario, subtotal });
    });
    const totalOriginal = total;

    const ultimaConDescuento = await this.ordenRepo.findOne({
      where: { usuarioId, descuentoAplicado: true, estado: Not(EstadoOrden.CANCELADA) },
      order: { fechaCreacion: 'DESC' },
    });
    const desde = ultimaConDescuento?.fechaCreacion || new Date(0);
    const ordenesPrevias = await this.ordenRepo.find({
      where: { usuarioId, estado: Not(EstadoOrden.CANCELADA) },
      relations: { detalles: true },
    });
    const productosPrevios = ordenesPrevias
      .filter((o) => o.fechaCreacion >= desde && !o.descuentoAplicado)
      .reduce((sum, o) =>
        sum + (o.detalles || []).reduce((s, d) => s + d.cantidad, 0), 0);

    let descuento = 0;
    let descuentoAplicado = false;
    if (productosPrevios >= 10) {
      const descuentoStr = await this.configService.obtener('descuento_cliente_frecuente');
      if (descuentoStr) {
        descuento = Math.round(total * (Number(descuentoStr) / 100) * 100) / 100;
        total = totalOriginal - descuento;
        descuentoAplicado = true;
      }
    }

    const orden = this.ordenRepo.create({ usuarioId, numeroOrden, total, totalOriginal, descuento, descuentoAplicado, direccionEnvio, metodoPago, detalles });

    for (const item of items) {
      await this.productosService.descontarStock(item.productoId, item.cantidad);
    }

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
    if (estado === EstadoOrden.CANCELADA && orden.estado !== EstadoOrden.CANCELADA) {
      for (const detalle of orden.detalles) {
        await this.productosService.aumentarStock(detalle.productoId, detalle.cantidad);
      }
    }
    orden.estado = estado;
    return this.ordenRepo.save(orden);
  }

  async obtenerDescuentoClienteFrecuente(usuarioId: number): Promise<{ tieneDescuento: boolean; porcentaje: number; totalOrdenes: number; totalProductos: number }> {
    const ultimaConDescuento = await this.ordenRepo.findOne({
      where: { usuarioId, descuentoAplicado: true, estado: Not(EstadoOrden.CANCELADA) },
      order: { fechaCreacion: 'DESC' },
    });
    const desde = ultimaConDescuento?.fechaCreacion || new Date(0);
    const ordenes = await this.ordenRepo.find({
      where: { usuarioId, estado: Not(EstadoOrden.CANCELADA) },
      relations: { detalles: true },
    });
    const ordenesRecientes = ordenes.filter((o) => o.fechaCreacion >= desde && !o.descuentoAplicado);
    const totalProductos = ordenesRecientes.reduce((sum, o) =>
      sum + (o.detalles || []).reduce((s, d) => s + d.cantidad, 0), 0);
    const descuentoStr = await this.configService.obtener('descuento_cliente_frecuente');
    const porcentaje = Number(descuentoStr || 0);
    return { tieneDescuento: totalProductos >= 10 && porcentaje > 0, porcentaje, totalOrdenes: ordenesRecientes.length, totalProductos };
  }

  async listarConDescuentos() {
    return this.ordenRepo.createQueryBuilder('orden')
      .leftJoinAndSelect('orden.usuario', 'usuario')
      .where('orden.descuento IS NOT NULL')
      .andWhere('orden.descuento > 0')
      .orderBy('orden.fecha_creacion', 'DESC')
      .getMany();
  }

  async obtenerIngresosPorMes() {
    return this.ordenRepo.query(`
      SELECT TO_CHAR(fecha_orden, 'YYYY-MM') as mes, SUM(total) as ingresos, COUNT(*) as total_ordenes
      FROM ordenes WHERE estado != 'CANCELADA'
      GROUP BY mes ORDER BY mes DESC LIMIT 12
    `);
  }
}

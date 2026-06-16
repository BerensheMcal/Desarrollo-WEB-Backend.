import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Orden } from './orden.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'detalles_orden' })
export class DetalleOrden extends EntidadBase {
  @ManyToOne(() => Orden, (orden) => orden.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orden_id' })
  orden!: Orden;

  @Column({ name: 'orden_id' })
  ordenId!: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;

  @Column({ name: 'producto_id' })
  productoId!: number;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad!: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario!: number;

  @Column({ name: 'subtotal', type: 'decimal', precision: 12, scale: 2 })
  subtotal!: number;
}

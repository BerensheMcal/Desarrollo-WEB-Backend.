import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { DetalleOrden } from './detalle-orden.entity';

export enum EstadoOrden {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  ENVIADA = 'ENVIADA',
  ENTREGADA = 'ENTREGADA',
  CANCELADA = 'CANCELADA',
}

@Entity({ name: 'ordenes' })
export class Orden extends EntidadBase {
  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @Column({ name: 'numero_orden', length: 40, unique: true })
  numeroOrden!: string;

  @Column({ name: 'fecha_orden', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaOrden!: Date;

  @Column({ name: 'total', type: 'decimal', precision: 12, scale: 2 })
  total!: number;

  @Column({ name: 'total_original', type: 'decimal', precision: 12, scale: 2, nullable: true })
  totalOriginal!: number | null;

  @Column({ name: 'descuento', type: 'decimal', precision: 12, scale: 2, nullable: true })
  descuento!: number | null;

  @Column({ name: 'descuento_aplicado', type: 'boolean', default: false })
  descuentoAplicado!: boolean;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoOrden,
    default: EstadoOrden.PENDIENTE,
  })
  estado!: EstadoOrden;

  @Column({ name: 'direccion_envio', type: 'text', nullable: true })
  direccionEnvio!: string | null;

  @Column({ name: 'metodo_pago', type: 'varchar', length: 50, nullable: true })
  metodoPago!: string | null;

  @Column({ name: 'notas', type: 'text', nullable: true })
  notas!: string | null;

  @OneToMany(() => DetalleOrden, (detalle) => detalle.orden, { cascade: true })
  detalles!: DetalleOrden[];
}

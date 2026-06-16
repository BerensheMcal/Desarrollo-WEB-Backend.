import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { Taller } from './taller.entity';

export enum EstadoReserva {
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA',
}

@Entity({ name: 'reservas_taller' })
export class ReservaTaller extends EntidadBase {
  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId!: number;

  @ManyToOne(() => Taller, (taller) => taller.reservas)
  @JoinColumn({ name: 'taller_id' })
  taller!: Taller;

  @Column({ name: 'taller_id' })
  tallerId!: number;

  @Column({ name: 'cantidad_cupos', type: 'int', default: 1 })
  cantidadCupos!: number;

  @Column({ name: 'fecha_reserva', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaReserva!: Date;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.CONFIRMADA,
  })
  estado!: EstadoReserva;
}

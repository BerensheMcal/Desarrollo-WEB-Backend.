
/* ELIMINACION TALLERES */

import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { EntidadBaseConEliminacion } from './entidad-base';
import { ReservaTaller } from './reserva-taller.entity';

@Entity({ name: 'talleres' })
export class Taller extends EntidadBaseConEliminacion {
  @Column({ name: 'nombre', length: 200 })
  nombre!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio!: Date;

  @Column({ name: 'fecha_fin', type: 'date' })
  fechaFin!: Date;

  @Column({ name: 'hora_inicio', type: 'time', nullable: true })
  horaInicio!: string | null;

  @Column({ name: 'hora_fin', type: 'time', nullable: true })
  horaFin!: string | null;

  @Column({ name: 'cupos_maximos', type: 'int' })
  cuposMaximos!: number;

  @Column({ name: 'cupos_disponibles', type: 'int' })
  cuposDisponibles!: number;

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio!: number;

  @Column({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true })
  imagenUrl!: string | null;

  @Column({ name: 'ubicacion', type: 'varchar', length: 300, nullable: true })
  ubicacion!: string | null;

  @OneToMany(() => ReservaTaller, (reserva) => reserva.taller)
  reservas!: ReservaTaller[];
}

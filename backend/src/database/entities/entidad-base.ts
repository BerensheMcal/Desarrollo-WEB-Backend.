import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class EntidadBase {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion!: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion!: Date;
}
/* CAMPO DE ELIMINACIÓN */
export abstract class EntidadBaseConEliminacion extends EntidadBase {
  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true })
  fechaEliminacion!: Date | null;

  @Column({ name: 'eliminado', default: false })
  eliminado!: boolean;
}

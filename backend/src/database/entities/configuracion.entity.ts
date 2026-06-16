import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'configuracion' })
export class Configuracion {
  @PrimaryGeneratedColumn('identity')
  id!: number;

  @Column({ name: 'clave', length: 100, unique: true })
  clave!: string;

  @Column({ name: 'valor', length: 255 })
  valor!: string;
}

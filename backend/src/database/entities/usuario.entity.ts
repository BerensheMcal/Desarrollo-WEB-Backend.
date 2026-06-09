import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntidadBaseConEliminacion } from './entidad-base';
import { Carrito } from './carrito.entity';
import { Orden } from './orden.entity';
import { ReservaTaller } from './reserva-taller.entity';

export enum RolUsuario {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CLIENTE = 'CLIENTE',
}

@Entity({ name: 'usuarios' })
export class Usuario extends EntidadBaseConEliminacion {
  @Column({ name: 'nombre', length: 150 })
  nombre: string;

  @Column({ name: 'email', length: 200, unique: true })
  email: string;

  @Column({ name: 'contrasena_hash', length: 255, select: false })
  contrasenaHash: string;

  @Column({
    name: 'rol',
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  rol: RolUsuario;

  @Column({ name: 'celular', type: 'varchar', length: 20, nullable: true })
  celular: string | null;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion: string | null;

  @Column({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true })
  imagenUrl: string | null;

  @OneToOne(() => Carrito, (carrito) => carrito.usuario)
  carrito: Carrito;

  @OneToMany(() => Orden, (orden) => orden.usuario)
  ordenes: Orden[];

  @OneToMany(() => ReservaTaller, (reserva) => reserva.usuario)
  reservas: ReservaTaller[];
}

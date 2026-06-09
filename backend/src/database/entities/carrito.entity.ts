import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { ItemCarrito } from './item-carrito.entity';

@Entity({ name: 'carritos' })
export class Carrito extends EntidadBase {
  @OneToOne(() => Usuario, (usuario) => usuario.carrito)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id', unique: true })
  usuarioId: number;

  @OneToMany(() => ItemCarrito, (item) => item.carrito, { cascade: true })
  items: ItemCarrito[];
}

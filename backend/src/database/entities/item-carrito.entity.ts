import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Carrito } from './carrito.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'items_carrito' })
export class ItemCarrito extends EntidadBase {
  @ManyToOne(() => Carrito, (carrito) => carrito.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carrito_id' })
  carrito: Carrito;

  @Column({ name: 'carrito_id' })
  carritoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @Column({ name: 'cantidad', type: 'int', default: 1 })
  cantidad: number;
}

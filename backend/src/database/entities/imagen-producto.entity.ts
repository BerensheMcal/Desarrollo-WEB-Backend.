import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntidadBase } from './entidad-base';
import { Producto } from './producto.entity';

@Entity({ name: 'imagenes_producto' })
export class ImagenProducto extends EntidadBase {
  @ManyToOne(() => Producto, (producto) => producto.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producto_id' })
  producto!: Producto;

  @Column({ name: 'producto_id' })
  productoId!: number;

  @Column({ name: 'url', length: 500 })
  url!: string;

  @Column({ name: 'orden', type: 'int', default: 0 })
  orden!: number;
}

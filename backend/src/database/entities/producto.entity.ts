import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntidadBaseConEliminacion } from './entidad-base';
import { Categoria } from './categoria.entity';
import { ImagenProducto } from './imagen-producto.entity';

@Entity({ name: 'productos' })
export class Producto extends EntidadBaseConEliminacion {
  @Column({ name: 'nombre', length: 200 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ name: 'precio', type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'stock', type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'imagen_principal_url', type: 'varchar', length: 500, nullable: true })
  imagenPrincipalUrl: string | null;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'categoria_id', type: 'int', nullable: true })
  categoriaId: number | null;

  @OneToMany(() => ImagenProducto, (imagen) => imagen.producto, { cascade: true })
  imagenes: ImagenProducto[];
}

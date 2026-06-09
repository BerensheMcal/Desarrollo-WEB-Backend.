import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { EntidadBaseConEliminacion } from './entidad-base';
import { Producto } from './producto.entity';

@Entity({ name: 'categorias' })
export class Categoria extends EntidadBaseConEliminacion {
  @Column({ name: 'nombre', length: 150 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true })
  imagenUrl: string | null;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}

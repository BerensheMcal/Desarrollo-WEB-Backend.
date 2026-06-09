import { EntidadBaseConEliminacion } from './entidad-base';
import { Categoria } from './categoria.entity';
import { ImagenProducto } from './imagen-producto.entity';
export declare class Producto extends EntidadBaseConEliminacion {
    nombre: string;
    descripcion: string | null;
    precio: number;
    stock: number;
    imagenPrincipalUrl: string | null;
    categoria: Categoria;
    categoriaId: number | null;
    imagenes: ImagenProducto[];
}

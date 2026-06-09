import { EntidadBaseConEliminacion } from './entidad-base';
import { Producto } from './producto.entity';
export declare class Categoria extends EntidadBaseConEliminacion {
    nombre: string;
    descripcion: string | null;
    imagenUrl: string | null;
    productos: Producto[];
}

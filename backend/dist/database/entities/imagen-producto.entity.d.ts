import { EntidadBase } from './entidad-base';
import { Producto } from './producto.entity';
export declare class ImagenProducto extends EntidadBase {
    producto: Producto;
    productoId: number;
    url: string;
    orden: number;
}

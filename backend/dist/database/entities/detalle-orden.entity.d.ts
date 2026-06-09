import { EntidadBase } from './entidad-base';
import { Orden } from './orden.entity';
import { Producto } from './producto.entity';
export declare class DetalleOrden extends EntidadBase {
    orden: Orden;
    ordenId: number;
    producto: Producto;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

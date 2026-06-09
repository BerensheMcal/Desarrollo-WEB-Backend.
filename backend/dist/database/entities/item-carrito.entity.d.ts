import { EntidadBase } from './entidad-base';
import { Carrito } from './carrito.entity';
import { Producto } from './producto.entity';
export declare class ItemCarrito extends EntidadBase {
    carrito: Carrito;
    carritoId: number;
    producto: Producto;
    productoId: number;
    cantidad: number;
}

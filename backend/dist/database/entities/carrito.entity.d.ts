import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { ItemCarrito } from './item-carrito.entity';
export declare class Carrito extends EntidadBase {
    usuario: Usuario;
    usuarioId: number;
    items: ItemCarrito[];
}

import { Repository } from 'typeorm';
import { Carrito } from '../../database/entities/carrito.entity';
import { ItemCarrito } from '../../database/entities/item-carrito.entity';
export declare class CarritoService {
    private readonly carritoRepo;
    private readonly itemRepo;
    constructor(carritoRepo: Repository<Carrito>, itemRepo: Repository<ItemCarrito>);
    obtenerOcrear(usuarioId: number): Promise<Carrito>;
    agregarItem(usuarioId: number, productoId: number, cantidad: number): Promise<ItemCarrito>;
    eliminarItem(usuarioId: number, itemId: number): Promise<import("typeorm").DeleteResult>;
    vaciar(usuarioId: number): Promise<import("typeorm").DeleteResult>;
}

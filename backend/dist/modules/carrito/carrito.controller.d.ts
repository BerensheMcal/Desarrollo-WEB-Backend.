import { CarritoService } from './carrito.service';
export declare class CarritoController {
    private readonly carritoService;
    constructor(carritoService: CarritoService);
    obtener(req: any): Promise<import("../../database/entities").Carrito>;
    agregar(req: any, productoId: number, cantidad: number): Promise<import("../../database/entities").ItemCarrito>;
    eliminarItem(req: any, itemId: number): Promise<import("typeorm").DeleteResult>;
    vaciar(req: any): Promise<import("typeorm").DeleteResult>;
}

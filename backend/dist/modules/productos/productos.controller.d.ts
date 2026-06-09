import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    listar(categoria?: number): Promise<import("../../database/entities").Producto[]>;
    destacados(): Promise<import("../../database/entities").Producto[]>;
    buscarPorId(id: number): Promise<import("../../database/entities").Producto>;
}

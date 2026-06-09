import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
export declare class AdminProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    listar(): Promise<import("../../database/entities").Producto[]>;
    masVendidos(): Promise<any>;
    crear(dto: CrearProductoDto, archivo?: Express.Multer.File): Promise<import("../../database/entities").Producto>;
    actualizar(id: number, body: any, archivo?: Express.Multer.File): Promise<import("../../database/entities").Producto>;
    eliminar(id: number): Promise<import("../../database/entities").Producto>;
}

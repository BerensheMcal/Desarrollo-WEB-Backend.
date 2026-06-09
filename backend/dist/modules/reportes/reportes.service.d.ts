import { OrdenesService } from '../ordenes/ordenes.service';
import { ProductosService } from '../productos/productos.service';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class ReportesService {
    private readonly ordenesService;
    private readonly productosService;
    private readonly usuariosService;
    constructor(ordenesService: OrdenesService, productosService: ProductosService, usuariosService: UsuariosService);
    obtenerDatosDashboard(): Promise<{
        ingresosPorMes: any;
        productosMasVendidos: any;
        clientesFrecuentes: any;
    }>;
    generarReporteVentas(formato: string): Promise<Buffer<ArrayBufferLike> | {
        ingresosPorMes: any;
        productosMasVendidos: any;
        clientesFrecuentes: any;
    }>;
    private generarPDF;
}

import { Repository } from 'typeorm';
import { Orden, EstadoOrden } from '../../database/entities/orden.entity';
import { DetalleOrden } from '../../database/entities/detalle-orden.entity';
export declare class OrdenesService {
    private readonly ordenRepo;
    private readonly detalleRepo;
    constructor(ordenRepo: Repository<Orden>, detalleRepo: Repository<DetalleOrden>);
    crear(usuarioId: number, items: {
        productoId: number;
        cantidad: number;
        precioUnitario: number;
    }[], direccionEnvio?: string, metodoPago?: string): Promise<Orden>;
    listarPorUsuario(usuarioId: number): Promise<Orden[]>;
    listarTodas(): Promise<Orden[]>;
    buscarPorId(id: number): Promise<Orden>;
    actualizarEstado(id: number, estado: EstadoOrden): Promise<Orden>;
    obtenerIngresosPorMes(): Promise<any>;
}

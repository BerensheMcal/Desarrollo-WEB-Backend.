import { OrdenesService } from './ordenes.service';
import { EstadoOrden } from '../../database/entities';
export declare class AdminOrdenesController {
    private readonly ordenesService;
    constructor(ordenesService: OrdenesService);
    listar(): Promise<import("../../database/entities").Orden[]>;
    buscarPorId(id: number): Promise<import("../../database/entities").Orden>;
    actualizarEstado(id: number, estado: EstadoOrden): Promise<import("../../database/entities").Orden>;
}

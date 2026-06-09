import { OrdenesService } from './ordenes.service';
import { CrearOrdenDto } from './dto/crear-orden.dto';
export declare class OrdenesController {
    private readonly ordenesService;
    constructor(ordenesService: OrdenesService);
    listar(req: any): Promise<import("../../database/entities").Orden[]>;
    buscarPorId(id: number): Promise<import("../../database/entities").Orden>;
    crear(req: any, dto: CrearOrdenDto): Promise<import("../../database/entities").Orden>;
}

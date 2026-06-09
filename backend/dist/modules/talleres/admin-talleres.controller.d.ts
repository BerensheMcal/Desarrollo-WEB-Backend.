import { TalleresService } from './talleres.service';
import { CrearTallerDto } from './dto/crear-taller.dto';
export declare class AdminTalleresController {
    private readonly talleresService;
    constructor(talleresService: TalleresService);
    listar(): Promise<import("../../database/entities").Taller[]>;
    crear(dto: CrearTallerDto): Promise<import("../../database/entities").Taller>;
    actualizar(id: number, body: any, archivo?: Express.Multer.File): Promise<import("../../database/entities").Taller>;
    eliminar(id: number): Promise<import("../../database/entities").Taller>;
}

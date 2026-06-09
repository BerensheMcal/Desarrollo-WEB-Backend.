import { TalleresService } from './talleres.service';
export declare class TalleresController {
    private readonly talleresService;
    constructor(talleresService: TalleresService);
    listar(): Promise<import("../../database/entities").Taller[]>;
    buscarPorId(id: number): Promise<import("../../database/entities").Taller>;
}

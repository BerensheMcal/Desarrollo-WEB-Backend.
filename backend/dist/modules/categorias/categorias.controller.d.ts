import { CategoriasService } from './categorias.service';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    listar(): Promise<import("../../database/entities").Categoria[]>;
    buscarPorId(id: number): Promise<import("../../database/entities").Categoria>;
}

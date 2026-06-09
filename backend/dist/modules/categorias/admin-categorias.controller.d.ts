import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';
export declare class AdminCategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    listar(): Promise<import("../../database/entities").Categoria[]>;
    crear(dto: CrearCategoriaDto): Promise<import("../../database/entities").Categoria>;
    actualizar(id: number, dto: ActualizarCategoriaDto): Promise<import("../../database/entities").Categoria>;
    eliminar(id: number): Promise<import("../../database/entities").Categoria>;
}

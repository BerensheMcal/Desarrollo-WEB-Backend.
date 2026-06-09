import { Repository } from 'typeorm';
import { Categoria } from '../../database/entities/categoria.entity';
export declare class CategoriasService {
    private readonly categoriaRepo;
    constructor(categoriaRepo: Repository<Categoria>);
    listar(): Promise<Categoria[]>;
    listarTodas(): Promise<Categoria[]>;
    buscarPorId(id: number): Promise<Categoria>;
    crear(data: Partial<Categoria>): Promise<Categoria>;
    actualizar(id: number, data: Partial<Categoria>): Promise<Categoria>;
    eliminarSuave(id: number): Promise<Categoria>;
}

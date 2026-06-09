import { Repository } from 'typeorm';
import { Taller } from '../../database/entities/taller.entity';
export declare class TalleresService {
    private readonly tallerRepo;
    constructor(tallerRepo: Repository<Taller>);
    listar(): Promise<Taller[]>;
    listarActivos(): Promise<Taller[]>;
    buscarPorId(id: number): Promise<Taller>;
    crear(data: Partial<Taller>): Promise<Taller>;
    actualizar(id: number, data: Partial<Taller>): Promise<Taller>;
    eliminarSuave(id: number): Promise<Taller>;
    descontarCupos(tallerId: number, cantidad: number): Promise<Taller>;
    restaurarCupos(tallerId: number, cantidad: number): Promise<Taller>;
}

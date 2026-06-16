import { Repository } from 'typeorm';
import { Configuracion } from '../../database/entities/configuracion.entity';
export declare class ConfiguracionService {
    private readonly configRepo;
    constructor(configRepo: Repository<Configuracion>);
    obtener(clave: string): Promise<string | null>;
    establecer(clave: string, valor: string): Promise<Configuracion>;
    listarTodas(): Promise<Configuracion[]>;
}

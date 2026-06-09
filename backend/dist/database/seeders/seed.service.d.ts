import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
export declare class SeedService {
    private readonly usuarioRepo;
    private readonly logger;
    constructor(usuarioRepo: Repository<Usuario>);
    ejecutar(): Promise<void>;
}

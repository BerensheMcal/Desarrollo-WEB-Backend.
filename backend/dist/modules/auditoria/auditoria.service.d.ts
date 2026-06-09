import { Repository } from 'typeorm';
import { RegistroAuditoria } from '../../database/entities/registro-auditoria.entity';
export declare class AuditoriaService {
    private readonly auditoriaRepo;
    constructor(auditoriaRepo: Repository<RegistroAuditoria>);
    registrar(data: Partial<RegistroAuditoria>): Promise<RegistroAuditoria>;
    listar(): Promise<RegistroAuditoria[]>;
}

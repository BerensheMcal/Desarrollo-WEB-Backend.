import { AuditoriaService } from './auditoria.service';
export declare class AuditoriaController {
    private readonly auditoriaService;
    constructor(auditoriaService: AuditoriaService);
    listar(): Promise<import("../../database/entities").RegistroAuditoria[]>;
}

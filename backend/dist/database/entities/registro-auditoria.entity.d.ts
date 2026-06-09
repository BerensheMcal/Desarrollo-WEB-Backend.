import { EntidadBase } from './entidad-base';
export declare enum EventoAuditoria {
    INGRESO_EXITOSO = "INGRESO_EXITOSO",
    INGRESO_FALLIDO = "INGRESO_FALLIDO",
    CIERRE_SESION = "CIERRE_SESION"
}
export declare class RegistroAuditoria extends EntidadBase {
    usuarioId: number | null;
    emailIntentado: string | null;
    direccionIp: string;
    evento: EventoAuditoria;
    navegador: string | null;
    fechaHora: Date;
}

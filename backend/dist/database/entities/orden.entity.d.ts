import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { DetalleOrden } from './detalle-orden.entity';
export declare enum EstadoOrden {
    PENDIENTE = "PENDIENTE",
    CONFIRMADA = "CONFIRMADA",
    ENVIADA = "ENVIADA",
    ENTREGADA = "ENTREGADA",
    CANCELADA = "CANCELADA"
}
export declare class Orden extends EntidadBase {
    usuario: Usuario;
    usuarioId: number;
    numeroOrden: string;
    fechaOrden: Date;
    total: number;
    estado: EstadoOrden;
    direccionEnvio: string | null;
    metodoPago: string | null;
    notas: string | null;
    detalles: DetalleOrden[];
}

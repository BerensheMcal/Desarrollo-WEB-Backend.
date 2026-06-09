import { EntidadBase } from './entidad-base';
import { Usuario } from './usuario.entity';
import { Taller } from './taller.entity';
export declare enum EstadoReserva {
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA",
    COMPLETADA = "COMPLETADA"
}
export declare class ReservaTaller extends EntidadBase {
    usuario: Usuario;
    usuarioId: number;
    taller: Taller;
    tallerId: number;
    cantidadCupos: number;
    fechaReserva: Date;
    estado: EstadoReserva;
}

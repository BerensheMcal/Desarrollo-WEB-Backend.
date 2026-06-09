import { EntidadBaseConEliminacion } from './entidad-base';
import { ReservaTaller } from './reserva-taller.entity';
export declare class Taller extends EntidadBaseConEliminacion {
    nombre: string;
    descripcion: string | null;
    fechaInicio: Date;
    fechaFin: Date;
    horaInicio: string | null;
    horaFin: string | null;
    cuposMaximos: number;
    cuposDisponibles: number;
    precio: number;
    imagenUrl: string | null;
    ubicacion: string | null;
    reservas: ReservaTaller[];
}

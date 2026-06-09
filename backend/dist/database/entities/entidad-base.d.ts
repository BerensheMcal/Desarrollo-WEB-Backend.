export declare abstract class EntidadBase {
    id: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
export declare abstract class EntidadBaseConEliminacion extends EntidadBase {
    fechaEliminacion: Date | null;
    eliminado: boolean;
}

import { ReservasService } from './reservas.service';
export declare class ReservasController {
    private readonly reservasService;
    constructor(reservasService: ReservasService);
    listar(req: any): Promise<import("../../database/entities").ReservaTaller[]>;
    crear(req: any, tallerId: number, cantidad: number): Promise<import("../../database/entities").ReservaTaller>;
    cancelar(id: number): Promise<import("../../database/entities").ReservaTaller>;
}

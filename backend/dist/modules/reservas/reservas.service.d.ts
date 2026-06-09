import { Repository } from 'typeorm';
import { ReservaTaller } from '../../database/entities/reserva-taller.entity';
import { TalleresService } from '../talleres/talleres.service';
export declare class ReservasService {
    private readonly reservaRepo;
    private readonly talleresService;
    constructor(reservaRepo: Repository<ReservaTaller>, talleresService: TalleresService);
    crear(usuarioId: number, tallerId: number, cantidadCupos: number): Promise<ReservaTaller>;
    listarPorUsuario(usuarioId: number): Promise<ReservaTaller[]>;
    listarTodas(): Promise<ReservaTaller[]>;
    cancelar(id: number): Promise<ReservaTaller>;
}

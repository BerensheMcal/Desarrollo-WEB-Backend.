import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaTaller, EstadoReserva } from '../../database/entities/reserva-taller.entity';
import { TalleresService } from '../talleres/talleres.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(ReservaTaller)
    private readonly reservaRepo: Repository<ReservaTaller>,
    private readonly talleresService: TalleresService,
  ) {}

  async crear(usuarioId: number, tallerId: number, cantidadCupos: number) {
    await this.talleresService.descontarCupos(tallerId, cantidadCupos);
    const reserva = this.reservaRepo.create({ usuarioId, tallerId, cantidadCupos });
    return this.reservaRepo.save(reserva);
  }

  async listarPorUsuario(usuarioId: number) {
    return this.reservaRepo.find({ where: { usuarioId }, relations: { taller: true }, order: { fechaCreacion: 'DESC' } });
  }

  async listarTodas() {
    return this.reservaRepo.find({ relations: { usuario: true, taller: true }, order: { fechaCreacion: 'DESC' } });
  }

  async cancelar(id: number) {
    const reserva = await this.reservaRepo.findOne({ where: { id } });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');
    reserva.estado = EstadoReserva.CANCELADA;
    await this.talleresService.restaurarCupos(reserva.tallerId, reserva.cantidadCupos);
    return this.reservaRepo.save(reserva);
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from '../../database/entities/taller.entity';

@Injectable()
export class TalleresService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepo: Repository<Taller>,
  ) {}

  async listar() {
    return this.tallerRepo.find({ where: { eliminado: false }, order: { fechaInicio: 'ASC' } });
  }

  async listarActivos() {
    return this.tallerRepo.find({ where: { eliminado: false }, order: { fechaInicio: 'ASC' } });
  }

  async buscarPorId(id: number) {
    const taller = await this.tallerRepo.findOne({ where: { id, eliminado: false } });
    if (!taller) throw new NotFoundException('Taller no encontrado');
    return taller;
  }

  async crear(data: Partial<Taller>) {
    if (data.cuposDisponibles === undefined || data.cuposDisponibles === null) {
      data.cuposDisponibles = data.cuposMaximos;
    }
    const taller = this.tallerRepo.create(data);
    return this.tallerRepo.save(taller);
  }

  async actualizar(id: number, data: Partial<Taller>) {
    const taller = await this.buscarPorId(id);
    Object.assign(taller, data);
    return this.tallerRepo.save(taller);
  }

  async eliminarSuave(id: number) {
    const taller = await this.buscarPorId(id);
    taller.eliminado = true;
    return this.tallerRepo.save(taller);
  }

  async descontarCupos(tallerId: number, cantidad: number) {
    const taller = await this.buscarPorId(tallerId);
    if (taller.cuposDisponibles < cantidad) {
      throw new BadRequestException('No hay suficientes cupos disponibles');
    }
    taller.cuposDisponibles -= cantidad;
    return this.tallerRepo.save(taller);
  }

  async restaurarCupos(tallerId: number, cantidad: number) {
    const taller = await this.buscarPorId(tallerId);
    taller.cuposDisponibles += cantidad;
    if (taller.cuposDisponibles > taller.cuposMaximos) {
      taller.cuposDisponibles = taller.cuposMaximos;
    }
    return this.tallerRepo.save(taller);
  }
}

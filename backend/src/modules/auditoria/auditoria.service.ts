import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroAuditoria } from '../../database/entities/registro-auditoria.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(RegistroAuditoria)
    private readonly auditoriaRepo: Repository<RegistroAuditoria>,
  ) {}

  async registrar(data: Partial<RegistroAuditoria>) {
    const registro = this.auditoriaRepo.create(data);
    return this.auditoriaRepo.save(registro);
  }

  async listar() {
    return this.auditoriaRepo.find({ order: { fechaHora: 'DESC' }, take: 200 });
  }
}
/*SAVE Y LIST AU*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracion } from '../../database/entities/configuracion.entity';

@Injectable()
export class ConfiguracionService {
  constructor(
    @InjectRepository(Configuracion)
    private readonly configRepo: Repository<Configuracion>,
  ) {}

  async obtener(clave: string): Promise<string | null> {
    const registro = await this.configRepo.findOne({ where: { clave } });
    return registro?.valor ?? null;
  }

  async establecer(clave: string, valor: string): Promise<Configuracion> {
    const existente = await this.configRepo.findOne({ where: { clave } });
    if (existente) {
      existente.valor = valor;
      return this.configRepo.save(existente);
    }
    return this.configRepo.save(this.configRepo.create({ clave, valor }));
  }

  async listarTodas(): Promise<Configuracion[]> {
    return this.configRepo.find({ order: { clave: 'ASC' } });
  }
}

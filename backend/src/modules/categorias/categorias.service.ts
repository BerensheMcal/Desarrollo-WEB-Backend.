import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../../database/entities/categoria.entity';

/* ELIMINACION CATEGORIAS */

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async listar() {
    return this.categoriaRepo.find({ where: { eliminado: false } });
  }

  async listarTodas() {
    return this.categoriaRepo.find();
  }

  async buscarPorId(id: number) {
    const categoria = await this.categoriaRepo.findOne({ where: { id, eliminado: false } });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  async crear(data: Partial<Categoria>) {
    const categoria = this.categoriaRepo.create(data);
    return this.categoriaRepo.save(categoria);
  }

  async actualizar(id: number, data: Partial<Categoria>) {
    const categoria = await this.buscarPorId(id);
    Object.assign(categoria, data);
    return this.categoriaRepo.save(categoria);
  }

  async eliminarSuave(id: number) {
    const categoria = await this.buscarPorId(id);
    categoria.eliminado = true;
    return this.categoriaRepo.save(categoria);
  }
}

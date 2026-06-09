import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, RolUsuario } from '../../database/entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(dto: CrearUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.contrasena, salt);
    const usuario = this.usuarioRepo.create({
      ...dto,
      contrasenaHash: hash,
    });
    return this.usuarioRepo.save(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ where: { eliminado: false } });
  }

  async listarClientes(): Promise<Usuario[]> {
    return this.usuarioRepo.find({
      where: { eliminado: false, rol: RolUsuario.CLIENTE },
    });
  }

  async buscarPorId(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id, eliminado: false },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({
      where: { email, eliminado: false },
      select: { id: true, nombre: true, email: true, contrasenaHash: true, rol: true, celular: true, direccion: true, imagenUrl: true, fechaCreacion: true },
    });
  }

  async actualizar(id: number, dto: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.buscarPorId(id);
    if (dto.contrasena) {
      const salt = await bcrypt.genSalt(10);
      dto.contrasena = await bcrypt.hash(dto.contrasena, salt);
    }
    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  async actualizarPerfil(id: number, dto: { nombre?: string; email?: string; contrasena?: string; celular?: string; direccion?: string; imagenUrl?: string }): Promise<Usuario> {
    const usuario = await this.buscarPorId(id);
    if (dto.email && dto.email !== usuario.email) {
      const existente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
      if (existente) throw new BadRequestException('El email ya está en uso');
    }
    if (dto.contrasena) {
      const salt = await bcrypt.genSalt(10);
      dto.contrasena = await bcrypt.hash(dto.contrasena, salt);
    }
    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  async eliminarSuave(id: number): Promise<void> {
    const usuario = await this.buscarPorId(id);
    usuario.eliminado = true;
    await this.usuarioRepo.save(usuario);
  }

  async obtenerEstadisticasClientesFrecuentes() {
    return this.usuarioRepo.query(`
      SELECT u.id, u.nombre, u.email,
        COUNT(DISTINCT o.id) as total_ordenes,
        COUNT(DISTINCT rt.id) as total_reservas,
        COALESCE(SUM(o.total), 0) as total_gastado
      FROM usuarios u
      LEFT JOIN ordenes o ON o.usuario_id = u.id AND o.estado != 'CANCELADA'
      LEFT JOIN reservas_taller rt ON rt.usuario_id = u.id AND rt.estado = 'CONFIRMADA'
      WHERE u.rol = 'CLIENTE' AND u.eliminado = false
      GROUP BY u.id, u.nombre, u.email
      ORDER BY (COUNT(DISTINCT o.id) + COUNT(DISTINCT rt.id)) DESC
      LIMIT 10
    `);
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
let UsuariosService = class UsuariosService {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    async crear(dto) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(dto.contrasena, salt);
        const usuario = this.usuarioRepo.create({
            ...dto,
            contrasenaHash: hash,
        });
        return this.usuarioRepo.save(usuario);
    }
    async listar() {
        return this.usuarioRepo.find({ where: { eliminado: false } });
    }
    async listarClientes() {
        return this.usuarioRepo.find({
            where: { eliminado: false, rol: usuario_entity_1.RolUsuario.CLIENTE },
        });
    }
    async buscarPorId(id) {
        const usuario = await this.usuarioRepo.findOne({
            where: { id, eliminado: false },
        });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return usuario;
    }
    async buscarPorEmail(email) {
        return this.usuarioRepo.findOne({
            where: { email, eliminado: false },
            select: { id: true, nombre: true, email: true, contrasenaHash: true, rol: true, celular: true, direccion: true, imagenUrl: true, fechaCreacion: true },
        });
    }
    async actualizar(id, dto) {
        const usuario = await this.buscarPorId(id);
        if (dto.contrasena) {
            const salt = await bcrypt.genSalt(10);
            dto.contrasena = await bcrypt.hash(dto.contrasena, salt);
        }
        Object.assign(usuario, dto);
        return this.usuarioRepo.save(usuario);
    }
    async actualizarPerfil(id, dto) {
        const usuario = await this.buscarPorId(id);
        if (dto.email && dto.email !== usuario.email) {
            const existente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
            if (existente)
                throw new common_1.BadRequestException('El email ya está en uso');
        }
        if (dto.contrasena) {
            const salt = await bcrypt.genSalt(10);
            dto.contrasena = await bcrypt.hash(dto.contrasena, salt);
        }
        Object.assign(usuario, dto);
        return this.usuarioRepo.save(usuario);
    }
    async eliminarSuave(id) {
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
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map
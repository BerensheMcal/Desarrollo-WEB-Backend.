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
exports.TalleresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const taller_entity_1 = require("../../database/entities/taller.entity");
let TalleresService = class TalleresService {
    constructor(tallerRepo) {
        this.tallerRepo = tallerRepo;
    }
    async listar() {
        return this.tallerRepo.find({ where: { eliminado: false }, order: { fechaInicio: 'ASC' } });
    }
    async listarActivos() {
        return this.tallerRepo.find({ where: { eliminado: false }, order: { fechaInicio: 'ASC' } });
    }
    async buscarPorId(id) {
        const taller = await this.tallerRepo.findOne({ where: { id, eliminado: false } });
        if (!taller)
            throw new common_1.NotFoundException('Taller no encontrado');
        return taller;
    }
    async crear(data) {
        if (data.cuposDisponibles === undefined || data.cuposDisponibles === null) {
            data.cuposDisponibles = data.cuposMaximos;
        }
        const taller = this.tallerRepo.create(data);
        return this.tallerRepo.save(taller);
    }
    async actualizar(id, data) {
        const taller = await this.buscarPorId(id);
        Object.assign(taller, data);
        return this.tallerRepo.save(taller);
    }
    async eliminarSuave(id) {
        const taller = await this.buscarPorId(id);
        taller.eliminado = true;
        return this.tallerRepo.save(taller);
    }
    async descontarCupos(tallerId, cantidad) {
        const taller = await this.buscarPorId(tallerId);
        if (taller.cuposDisponibles < cantidad) {
            throw new common_1.BadRequestException('No hay suficientes cupos disponibles');
        }
        taller.cuposDisponibles -= cantidad;
        return this.tallerRepo.save(taller);
    }
    async restaurarCupos(tallerId, cantidad) {
        const taller = await this.buscarPorId(tallerId);
        taller.cuposDisponibles += cantidad;
        if (taller.cuposDisponibles > taller.cuposMaximos) {
            taller.cuposDisponibles = taller.cuposMaximos;
        }
        return this.tallerRepo.save(taller);
    }
};
exports.TalleresService = TalleresService;
exports.TalleresService = TalleresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(taller_entity_1.Taller)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TalleresService);
//# sourceMappingURL=talleres.service.js.map
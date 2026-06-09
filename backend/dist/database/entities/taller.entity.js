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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taller = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const reserva_taller_entity_1 = require("./reserva-taller.entity");
let Taller = class Taller extends entidad_base_1.EntidadBaseConEliminacion {
};
exports.Taller = Taller;
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 200 }),
    __metadata("design:type", String)
], Taller.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Taller.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date' }),
    __metadata("design:type", Date)
], Taller.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'date' }),
    __metadata("design:type", Date)
], Taller.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_inicio', type: 'time', nullable: true }),
    __metadata("design:type", Object)
], Taller.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hora_fin', type: 'time', nullable: true }),
    __metadata("design:type", Object)
], Taller.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cupos_maximos', type: 'int' }),
    __metadata("design:type", Number)
], Taller.prototype, "cuposMaximos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cupos_disponibles', type: 'int' }),
    __metadata("design:type", Number)
], Taller.prototype, "cuposDisponibles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Taller.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Taller.prototype, "imagenUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ubicacion', type: 'varchar', length: 300, nullable: true }),
    __metadata("design:type", Object)
], Taller.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_taller_entity_1.ReservaTaller, (reserva) => reserva.taller),
    __metadata("design:type", Array)
], Taller.prototype, "reservas", void 0);
exports.Taller = Taller = __decorate([
    (0, typeorm_1.Entity)({ name: 'talleres' })
], Taller);
//# sourceMappingURL=taller.entity.js.map
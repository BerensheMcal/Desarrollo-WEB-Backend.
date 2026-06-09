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
exports.ReservaTaller = exports.EstadoReserva = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const usuario_entity_1 = require("./usuario.entity");
const taller_entity_1 = require("./taller.entity");
var EstadoReserva;
(function (EstadoReserva) {
    EstadoReserva["CONFIRMADA"] = "CONFIRMADA";
    EstadoReserva["CANCELADA"] = "CANCELADA";
    EstadoReserva["COMPLETADA"] = "COMPLETADA";
})(EstadoReserva || (exports.EstadoReserva = EstadoReserva = {}));
let ReservaTaller = class ReservaTaller extends entidad_base_1.EntidadBase {
};
exports.ReservaTaller = ReservaTaller;
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.reservas),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], ReservaTaller.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], ReservaTaller.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => taller_entity_1.Taller, (taller) => taller.reservas),
    (0, typeorm_1.JoinColumn)({ name: 'taller_id' }),
    __metadata("design:type", taller_entity_1.Taller)
], ReservaTaller.prototype, "taller", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'taller_id' }),
    __metadata("design:type", Number)
], ReservaTaller.prototype, "tallerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_cupos', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ReservaTaller.prototype, "cantidadCupos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_reserva', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ReservaTaller.prototype, "fechaReserva", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: EstadoReserva,
        default: EstadoReserva.CONFIRMADA,
    }),
    __metadata("design:type", String)
], ReservaTaller.prototype, "estado", void 0);
exports.ReservaTaller = ReservaTaller = __decorate([
    (0, typeorm_1.Entity)({ name: 'reservas_taller' })
], ReservaTaller);
//# sourceMappingURL=reserva-taller.entity.js.map
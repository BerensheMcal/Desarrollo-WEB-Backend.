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
exports.RegistroAuditoria = exports.EventoAuditoria = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
var EventoAuditoria;
(function (EventoAuditoria) {
    EventoAuditoria["INGRESO_EXITOSO"] = "INGRESO_EXITOSO";
    EventoAuditoria["INGRESO_FALLIDO"] = "INGRESO_FALLIDO";
    EventoAuditoria["CIERRE_SESION"] = "CIERRE_SESION";
})(EventoAuditoria || (exports.EventoAuditoria = EventoAuditoria = {}));
let RegistroAuditoria = class RegistroAuditoria extends entidad_base_1.EntidadBase {
};
exports.RegistroAuditoria = RegistroAuditoria;
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], RegistroAuditoria.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_intentado', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], RegistroAuditoria.prototype, "emailIntentado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_ip', length: 50 }),
    __metadata("design:type", String)
], RegistroAuditoria.prototype, "direccionIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'evento',
        type: 'enum',
        enum: EventoAuditoria,
    }),
    __metadata("design:type", String)
], RegistroAuditoria.prototype, "evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'navegador', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], RegistroAuditoria.prototype, "navegador", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_hora', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RegistroAuditoria.prototype, "fechaHora", void 0);
exports.RegistroAuditoria = RegistroAuditoria = __decorate([
    (0, typeorm_1.Entity)({ name: 'registros_auditoria' })
], RegistroAuditoria);
//# sourceMappingURL=registro-auditoria.entity.js.map
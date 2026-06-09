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
exports.Orden = exports.EstadoOrden = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const usuario_entity_1 = require("./usuario.entity");
const detalle_orden_entity_1 = require("./detalle-orden.entity");
var EstadoOrden;
(function (EstadoOrden) {
    EstadoOrden["PENDIENTE"] = "PENDIENTE";
    EstadoOrden["CONFIRMADA"] = "CONFIRMADA";
    EstadoOrden["ENVIADA"] = "ENVIADA";
    EstadoOrden["ENTREGADA"] = "ENTREGADA";
    EstadoOrden["CANCELADA"] = "CANCELADA";
})(EstadoOrden || (exports.EstadoOrden = EstadoOrden = {}));
let Orden = class Orden extends entidad_base_1.EntidadBase {
};
exports.Orden = Orden;
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.ordenes),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Orden.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Orden.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_orden', length: 40, unique: true }),
    __metadata("design:type", String)
], Orden.prototype, "numeroOrden", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_orden', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Orden.prototype, "fechaOrden", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Orden.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: EstadoOrden,
        default: EstadoOrden.PENDIENTE,
    }),
    __metadata("design:type", String)
], Orden.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_envio', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Orden.prototype, "direccionEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metodo_pago', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Orden.prototype, "metodoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notas', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Orden.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_orden_entity_1.DetalleOrden, (detalle) => detalle.orden, { cascade: true }),
    __metadata("design:type", Array)
], Orden.prototype, "detalles", void 0);
exports.Orden = Orden = __decorate([
    (0, typeorm_1.Entity)({ name: 'ordenes' })
], Orden);
//# sourceMappingURL=orden.entity.js.map
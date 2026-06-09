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
exports.DetalleOrden = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const orden_entity_1 = require("./orden.entity");
const producto_entity_1 = require("./producto.entity");
let DetalleOrden = class DetalleOrden extends entidad_base_1.EntidadBase {
};
exports.DetalleOrden = DetalleOrden;
__decorate([
    (0, typeorm_1.ManyToOne)(() => orden_entity_1.Orden, (orden) => orden.detalles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orden_id' }),
    __metadata("design:type", orden_entity_1.Orden)
], DetalleOrden.prototype, "orden", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'orden_id' }),
    __metadata("design:type", Number)
], DetalleOrden.prototype, "ordenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], DetalleOrden.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], DetalleOrden.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', type: 'int' }),
    __metadata("design:type", Number)
], DetalleOrden.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DetalleOrden.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subtotal', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], DetalleOrden.prototype, "subtotal", void 0);
exports.DetalleOrden = DetalleOrden = __decorate([
    (0, typeorm_1.Entity)({ name: 'detalles_orden' })
], DetalleOrden);
//# sourceMappingURL=detalle-orden.entity.js.map
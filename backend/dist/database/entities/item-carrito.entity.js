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
exports.ItemCarrito = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const carrito_entity_1 = require("./carrito.entity");
const producto_entity_1 = require("./producto.entity");
let ItemCarrito = class ItemCarrito extends entidad_base_1.EntidadBase {
};
exports.ItemCarrito = ItemCarrito;
__decorate([
    (0, typeorm_1.ManyToOne)(() => carrito_entity_1.Carrito, (carrito) => carrito.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'carrito_id' }),
    __metadata("design:type", carrito_entity_1.Carrito)
], ItemCarrito.prototype, "carrito", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'carrito_id' }),
    __metadata("design:type", Number)
], ItemCarrito.prototype, "carritoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], ItemCarrito.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], ItemCarrito.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ItemCarrito.prototype, "cantidad", void 0);
exports.ItemCarrito = ItemCarrito = __decorate([
    (0, typeorm_1.Entity)({ name: 'items_carrito' })
], ItemCarrito);
//# sourceMappingURL=item-carrito.entity.js.map
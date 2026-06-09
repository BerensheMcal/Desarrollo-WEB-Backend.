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
exports.Carrito = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const usuario_entity_1 = require("./usuario.entity");
const item_carrito_entity_1 = require("./item-carrito.entity");
let Carrito = class Carrito extends entidad_base_1.EntidadBase {
};
exports.Carrito = Carrito;
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.carrito),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Carrito.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', unique: true }),
    __metadata("design:type", Number)
], Carrito.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_carrito_entity_1.ItemCarrito, (item) => item.carrito, { cascade: true }),
    __metadata("design:type", Array)
], Carrito.prototype, "items", void 0);
exports.Carrito = Carrito = __decorate([
    (0, typeorm_1.Entity)({ name: 'carritos' })
], Carrito);
//# sourceMappingURL=carrito.entity.js.map
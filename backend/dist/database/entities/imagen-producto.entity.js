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
exports.ImagenProducto = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const producto_entity_1 = require("./producto.entity");
let ImagenProducto = class ImagenProducto extends entidad_base_1.EntidadBase {
};
exports.ImagenProducto = ImagenProducto;
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.imagenes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], ImagenProducto.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], ImagenProducto.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url', length: 500 }),
    __metadata("design:type", String)
], ImagenProducto.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'orden', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ImagenProducto.prototype, "orden", void 0);
exports.ImagenProducto = ImagenProducto = __decorate([
    (0, typeorm_1.Entity)({ name: 'imagenes_producto' })
], ImagenProducto);
//# sourceMappingURL=imagen-producto.entity.js.map
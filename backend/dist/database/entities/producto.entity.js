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
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const categoria_entity_1 = require("./categoria.entity");
const imagen_producto_entity_1 = require("./imagen-producto.entity");
let Producto = class Producto extends entidad_base_1.EntidadBaseConEliminacion {
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 200 }),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagen_principal_url', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "imagenPrincipalUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.productos),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Producto.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imagen_producto_entity_1.ImagenProducto, (imagen) => imagen.producto, { cascade: true }),
    __metadata("design:type", Array)
], Producto.prototype, "imagenes", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)({ name: 'productos' })
], Producto);
//# sourceMappingURL=producto.entity.js.map
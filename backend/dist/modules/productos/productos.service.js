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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("../../database/entities/producto.entity");
const imagen_producto_entity_1 = require("../../database/entities/imagen-producto.entity");
let ProductosService = class ProductosService {
    constructor(productoRepo, imagenRepo) {
        this.productoRepo = productoRepo;
        this.imagenRepo = imagenRepo;
    }
    async listar() {
        return this.productoRepo.find({
            where: { eliminado: false },
            relations: { categoria: true, imagenes: true },
            order: { fechaCreacion: 'DESC' },
        });
    }
    async listarDestacados(limite = 8) {
        return this.productoRepo.find({
            where: { eliminado: false },
            relations: { categoria: true, imagenes: true },
            order: { fechaCreacion: 'DESC' },
            take: limite,
        });
    }
    async buscarPorId(id) {
        const producto = await this.productoRepo.findOne({
            where: { id, eliminado: false },
            relations: { categoria: true, imagenes: true },
        });
        if (!producto)
            throw new common_1.NotFoundException('Producto no encontrado');
        return producto;
    }
    async buscarPorCategoria(categoriaId) {
        return this.productoRepo.find({
            where: { categoriaId, eliminado: false },
            relations: { categoria: true, imagenes: true },
        });
    }
    async crear(data) {
        const producto = this.productoRepo.create(data);
        return this.productoRepo.save(producto);
    }
    async actualizar(id, data) {
        const producto = await this.buscarPorId(id);
        Object.assign(producto, data);
        return this.productoRepo.save(producto);
    }
    async eliminarSuave(id) {
        const producto = await this.buscarPorId(id);
        producto.eliminado = true;
        return this.productoRepo.save(producto);
    }
    async agregarImagen(productoId, url, orden = 0) {
        const imagen = this.imagenRepo.create({ productoId, url, orden });
        return this.imagenRepo.save(imagen);
    }
    async eliminarImagen(imagenId) {
        return this.imagenRepo.delete(imagenId);
    }
    async obtenerMasVendidos(limite = 10) {
        return this.productoRepo.query(`
      SELECT p.id, p.nombre, p.precio, p.imagen_principal_url,
        SUM(det.cantidad) as total_vendido,
        SUM(det.subtotal) as total_ingresos
      FROM productos p
      INNER JOIN detalles_orden det ON det.producto_id = p.id
      INNER JOIN ordenes o ON o.id = det.orden_id AND o.estado != 'CANCELADA'
      WHERE p.eliminado = false
      GROUP BY p.id, p.nombre, p.precio, p.imagen_principal_url
      ORDER BY total_vendido DESC
      LIMIT $1
    `, [limite]);
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(imagen_producto_entity_1.ImagenProducto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductosService);
//# sourceMappingURL=productos.service.js.map
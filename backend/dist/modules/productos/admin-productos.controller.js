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
exports.AdminProductosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const productos_service_1 = require("./productos.service");
const crear_producto_dto_1 = require("./dto/crear-producto.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
const multer_1 = require("multer");
const path_1 = require("path");
let AdminProductosController = class AdminProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    listar() {
        return this.productosService.listar();
    }
    masVendidos() {
        return this.productosService.obtenerMasVendidos();
    }
    crear(dto, archivo) {
        const data = { ...dto };
        if (archivo) {
            data.imagenPrincipalUrl = `/uploads/${archivo.filename}`;
        }
        return this.productosService.crear(data);
    }
    actualizar(id, body, archivo) {
        const data = {};
        if (body.nombre !== undefined)
            data.nombre = body.nombre;
        if (body.descripcion !== undefined)
            data.descripcion = body.descripcion;
        if (body.precio !== undefined)
            data.precio = Number(body.precio);
        if (body.stock !== undefined)
            data.stock = Number(body.stock);
        if (body.categoriaId !== undefined)
            data.categoriaId = body.categoriaId ? Number(body.categoriaId) : null;
        if (archivo)
            data.imagenPrincipalUrl = `/uploads/${archivo.filename}`;
        return this.productosService.actualizar(id, data);
    }
    eliminar(id) {
        return this.productosService.eliminarSuave(id);
    }
};
exports.AdminProductosController = AdminProductosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminProductosController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('mas-vendidos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminProductosController.prototype, "masVendidos", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(__dirname, '..', '..', '..', 'uploads'),
            filename: (req, file, cb) => {
                const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname)}`;
                cb(null, nombre);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                cb(new Error('Solo imágenes (jpg, jpeg, png, gif, webp)'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_producto_dto_1.CrearProductoDto, Object]),
    __metadata("design:returntype", void 0)
], AdminProductosController.prototype, "crear", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(__dirname, '..', '..', '..', 'uploads'),
            filename: (req, file, cb) => {
                const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname)}`;
                cb(null, nombre);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                cb(new Error('Solo imágenes (jpg, jpeg, png, gif, webp)'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminProductosController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminProductosController.prototype, "eliminar", null);
exports.AdminProductosController = AdminProductosController = __decorate([
    (0, common_1.Controller)('adminpanel/productos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolUsuario.ADMIN),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], AdminProductosController);
//# sourceMappingURL=admin-productos.controller.js.map
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
exports.AdminCategoriasController = void 0;
const common_1 = require("@nestjs/common");
const categorias_service_1 = require("./categorias.service");
const crear_categoria_dto_1 = require("./dto/crear-categoria.dto");
const actualizar_categoria_dto_1 = require("./dto/actualizar-categoria.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
let AdminCategoriasController = class AdminCategoriasController {
    constructor(categoriasService) {
        this.categoriasService = categoriasService;
    }
    listar() {
        return this.categoriasService.listarTodas();
    }
    crear(dto) {
        return this.categoriasService.crear(dto);
    }
    actualizar(id, dto) {
        return this.categoriasService.actualizar(id, dto);
    }
    eliminar(id) {
        return this.categoriasService.eliminarSuave(id);
    }
};
exports.AdminCategoriasController = AdminCategoriasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCategoriasController.prototype, "listar", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_categoria_dto_1.CrearCategoriaDto]),
    __metadata("design:returntype", void 0)
], AdminCategoriasController.prototype, "crear", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_categoria_dto_1.ActualizarCategoriaDto]),
    __metadata("design:returntype", void 0)
], AdminCategoriasController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminCategoriasController.prototype, "eliminar", null);
exports.AdminCategoriasController = AdminCategoriasController = __decorate([
    (0, common_1.Controller)('adminpanel/categorias'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolUsuario.ADMIN),
    __metadata("design:paramtypes", [categorias_service_1.CategoriasService])
], AdminCategoriasController);
//# sourceMappingURL=admin-categorias.controller.js.map
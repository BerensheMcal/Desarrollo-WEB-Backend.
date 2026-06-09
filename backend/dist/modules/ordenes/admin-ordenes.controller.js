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
exports.AdminOrdenesController = void 0;
const common_1 = require("@nestjs/common");
const ordenes_service_1 = require("./ordenes.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const entities_1 = require("../../database/entities");
let AdminOrdenesController = class AdminOrdenesController {
    constructor(ordenesService) {
        this.ordenesService = ordenesService;
    }
    listar() {
        return this.ordenesService.listarTodas();
    }
    buscarPorId(id) {
        return this.ordenesService.buscarPorId(id);
    }
    actualizarEstado(id, estado) {
        return this.ordenesService.actualizarEstado(id, estado);
    }
};
exports.AdminOrdenesController = AdminOrdenesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminOrdenesController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminOrdenesController.prototype, "buscarPorId", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AdminOrdenesController.prototype, "actualizarEstado", null);
exports.AdminOrdenesController = AdminOrdenesController = __decorate([
    (0, common_1.Controller)('adminpanel/ordenes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(entities_1.RolUsuario.ADMIN),
    __metadata("design:paramtypes", [ordenes_service_1.OrdenesService])
], AdminOrdenesController);
//# sourceMappingURL=admin-ordenes.controller.js.map
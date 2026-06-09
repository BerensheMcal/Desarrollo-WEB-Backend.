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
exports.AdminpanelController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const usuario_entity_1 = require("../database/entities/usuario.entity");
const reportes_service_1 = require("../modules/reportes/reportes.service");
let AdminpanelController = class AdminpanelController {
    constructor(reportesService) {
        this.reportesService = reportesService;
    }
    async dashboard() {
        return this.reportesService.obtenerDatosDashboard();
    }
};
exports.AdminpanelController = AdminpanelController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminpanelController.prototype, "dashboard", null);
exports.AdminpanelController = AdminpanelController = __decorate([
    (0, common_1.Controller)('adminpanel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(usuario_entity_1.RolUsuario.ADMIN),
    __metadata("design:paramtypes", [reportes_service_1.ReportesService])
], AdminpanelController);
//# sourceMappingURL=adminpanel.controller.js.map
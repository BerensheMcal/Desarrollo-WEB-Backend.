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
exports.AuthController = exports.IniciarSesionDto = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const class_validator_1 = require("class-validator");
class IniciarSesionDto {
}
exports.IniciarSesionDto = IniciarSesionDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    __metadata("design:type", String)
], IniciarSesionDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'La contraseña es requerida' }),
    __metadata("design:type", String)
], IniciarSesionDto.prototype, "contrasena", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IniciarSesionDto.prototype, "captchaToken", void 0);
class CerrarSesionDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CerrarSesionDto.prototype, "captchaToken", void 0);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async iniciarSesion(dto, req) {
        return this.authService.iniciarSesion(dto.email, dto.contrasena, req.ip, req.headers['user-agent'] || 'Desconocido');
    }
    async cerrarSesion(req) {
        return this.authService.cerrarSesion(req.user.id, req.ip, req.headers['user-agent'] || 'Desconocido');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('iniciar-sesion'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IniciarSesionDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "iniciarSesion", null);
__decorate([
    (0, common_1.Post)('cerrar-sesion'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "cerrarSesion", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
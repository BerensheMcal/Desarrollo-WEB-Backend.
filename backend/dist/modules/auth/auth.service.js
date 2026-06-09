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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const auditoria_service_1 = require("../auditoria/auditoria.service");
const registro_auditoria_entity_1 = require("../../database/entities/registro-auditoria.entity");
let AuthService = class AuthService {
    constructor(usuariosService, jwtService, auditoriaService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
        this.auditoriaService = auditoriaService;
    }
    async validarUsuario(email, contrasena) {
        const usuario = await this.usuariosService.buscarPorEmail(email);
        if (!usuario)
            return null;
        const coinciden = await bcrypt.compare(contrasena, usuario.contrasenaHash);
        if (!coinciden)
            return null;
        return usuario;
    }
    async iniciarSesion(email, contrasena, ip, navegador) {
        const usuario = await this.validarUsuario(email, contrasena);
        if (!usuario) {
            await this.auditoriaService.registrar({
                usuarioId: null,
                emailIntentado: email,
                direccionIp: ip,
                evento: registro_auditoria_entity_1.EventoAuditoria.INGRESO_FALLIDO,
                navegador,
            });
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre,
        };
        await this.auditoriaService.registrar({
            usuarioId: usuario.id,
            emailIntentado: email,
            direccionIp: ip,
            evento: registro_auditoria_entity_1.EventoAuditoria.INGRESO_EXITOSO,
            navegador,
        });
        return {
            token: this.jwtService.sign(payload),
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        };
    }
    async cerrarSesion(usuarioId, ip, navegador) {
        await this.auditoriaService.registrar({
            usuarioId,
            emailIntentado: null,
            direccionIp: ip,
            evento: registro_auditoria_entity_1.EventoAuditoria.CIERRE_SESION,
            navegador,
        });
        return { mensaje: 'Sesión cerrada correctamente' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService,
        auditoria_service_1.AuditoriaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
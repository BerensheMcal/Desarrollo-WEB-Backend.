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
exports.Usuario = exports.RolUsuario = void 0;
const typeorm_1 = require("typeorm");
const entidad_base_1 = require("./entidad-base");
const carrito_entity_1 = require("./carrito.entity");
const orden_entity_1 = require("./orden.entity");
const reserva_taller_entity_1 = require("./reserva-taller.entity");
var RolUsuario;
(function (RolUsuario) {
    RolUsuario["ADMIN"] = "ADMIN";
    RolUsuario["STAFF"] = "STAFF";
    RolUsuario["CLIENTE"] = "CLIENTE";
})(RolUsuario || (exports.RolUsuario = RolUsuario = {}));
let Usuario = class Usuario extends entidad_base_1.EntidadBaseConEliminacion {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 150 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 200, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contrasena_hash', length: 255, select: false }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasenaHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rol',
        type: 'enum',
        enum: RolUsuario,
        default: RolUsuario.CLIENTE,
    }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'celular', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Usuario.prototype, "celular", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Usuario.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagen_url', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Usuario.prototype, "imagenUrl", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => carrito_entity_1.Carrito, (carrito) => carrito.usuario),
    __metadata("design:type", carrito_entity_1.Carrito)
], Usuario.prototype, "carrito", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orden_entity_1.Orden, (orden) => orden.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "ordenes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reserva_taller_entity_1.ReservaTaller, (reserva) => reserva.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "reservas", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], Usuario);
//# sourceMappingURL=usuario.entity.js.map
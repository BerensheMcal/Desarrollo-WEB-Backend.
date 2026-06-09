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
exports.EntidadBaseConEliminacion = exports.EntidadBase = void 0;
const typeorm_1 = require("typeorm");
class EntidadBase {
}
exports.EntidadBase = EntidadBase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], EntidadBase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], EntidadBase.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], EntidadBase.prototype, "fechaActualizacion", void 0);
class EntidadBaseConEliminacion extends EntidadBase {
}
exports.EntidadBaseConEliminacion = EntidadBaseConEliminacion;
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], EntidadBaseConEliminacion.prototype, "fechaEliminacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'eliminado', default: false }),
    __metadata("design:type", Boolean)
], EntidadBaseConEliminacion.prototype, "eliminado", void 0);
//# sourceMappingURL=entidad-base.js.map
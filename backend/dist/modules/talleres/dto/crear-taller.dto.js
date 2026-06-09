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
exports.CrearTallerDto = void 0;
const class_validator_1 = require("class-validator");
class CrearTallerDto {
}
exports.CrearTallerDto = CrearTallerDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser texto' }),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(200, { message: 'El nombre no puede exceder 200 caracteres' }),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser texto' }),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha de inicio inválida' }),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha de fin inválida' }),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "horaInicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "horaFin", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Los cupos máximos deben ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'Debe haber al menos 1 cupo' }),
    __metadata("design:type", Number)
], CrearTallerDto.prototype, "cuposMaximos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Los cupos disponibles deben ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'Los cupos disponibles no pueden ser negativos' }),
    __metadata("design:type", Number)
], CrearTallerDto.prototype, "cuposDisponibles", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'El precio no puede ser negativo' }),
    __metadata("design:type", Number)
], CrearTallerDto.prototype, "precio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ubicación debe ser texto' }),
    __metadata("design:type", String)
], CrearTallerDto.prototype, "ubicacion", void 0);
//# sourceMappingURL=crear-taller.dto.js.map
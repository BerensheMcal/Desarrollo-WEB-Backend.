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
exports.CrearOrdenDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ItemOrdenDto {
}
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del producto debe ser un número' }),
    __metadata("design:type", Number)
], ItemOrdenDto.prototype, "productoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'La cantidad debe ser un número' }),
    (0, class_validator_1.Min)(1, { message: 'La cantidad mínima es 1' }),
    __metadata("design:type", Number)
], ItemOrdenDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El precio unitario debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'El precio unitario no puede ser negativo' }),
    __metadata("design:type", Number)
], ItemOrdenDto.prototype, "precioUnitario", void 0);
class CrearOrdenDto {
}
exports.CrearOrdenDto = CrearOrdenDto;
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Debe proporcionar un array de items' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemOrdenDto),
    __metadata("design:type", Array)
], CrearOrdenDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La dirección de envío debe ser texto' }),
    __metadata("design:type", String)
], CrearOrdenDto.prototype, "direccionEnvio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El método de pago debe ser texto' }),
    __metadata("design:type", String)
], CrearOrdenDto.prototype, "metodoPago", void 0);
//# sourceMappingURL=crear-orden.dto.js.map
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
exports.TalleresController = void 0;
const common_1 = require("@nestjs/common");
const talleres_service_1 = require("./talleres.service");
let TalleresController = class TalleresController {
    constructor(talleresService) {
        this.talleresService = talleresService;
    }
    listar() {
        return this.talleresService.listarActivos();
    }
    buscarPorId(id) {
        return this.talleresService.buscarPorId(id);
    }
};
exports.TalleresController = TalleresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TalleresController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TalleresController.prototype, "buscarPorId", null);
exports.TalleresController = TalleresController = __decorate([
    (0, common_1.Controller)('talleres'),
    __metadata("design:paramtypes", [talleres_service_1.TalleresService])
], TalleresController);
//# sourceMappingURL=talleres.controller.js.map
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
exports.CarritoController = void 0;
const common_1 = require("@nestjs/common");
const carrito_service_1 = require("./carrito.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let CarritoController = class CarritoController {
    constructor(carritoService) {
        this.carritoService = carritoService;
    }
    obtener(req) {
        return this.carritoService.obtenerOcrear(req.user.id);
    }
    agregar(req, productoId, cantidad) {
        return this.carritoService.agregarItem(req.user.id, productoId, cantidad);
    }
    eliminarItem(req, itemId) {
        return this.carritoService.eliminarItem(req.user.id, itemId);
    }
    vaciar(req) {
        return this.carritoService.vaciar(req.user.id);
    }
};
exports.CarritoController = CarritoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "obtener", null);
__decorate([
    (0, common_1.Post)('agregar/:productoId/:cantidad'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('productoId')),
    __param(2, (0, common_1.Param)('cantidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "agregar", null);
__decorate([
    (0, common_1.Delete)('item/:itemId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "eliminarItem", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "vaciar", null);
exports.CarritoController = CarritoController = __decorate([
    (0, common_1.Controller)('carrito'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [carrito_service_1.CarritoService])
], CarritoController);
//# sourceMappingURL=carrito.controller.js.map
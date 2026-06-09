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
exports.CarritoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const carrito_entity_1 = require("../../database/entities/carrito.entity");
const item_carrito_entity_1 = require("../../database/entities/item-carrito.entity");
let CarritoService = class CarritoService {
    constructor(carritoRepo, itemRepo) {
        this.carritoRepo = carritoRepo;
        this.itemRepo = itemRepo;
    }
    async obtenerOcrear(usuarioId) {
        let carrito = await this.carritoRepo.findOne({
            where: { usuarioId },
            relations: { items: { producto: true } },
        });
        if (!carrito) {
            carrito = this.carritoRepo.create({ usuarioId });
            carrito = await this.carritoRepo.save(carrito);
        }
        return carrito;
    }
    async agregarItem(usuarioId, productoId, cantidad) {
        const carrito = await this.obtenerOcrear(usuarioId);
        let item = await this.itemRepo.findOne({ where: { carritoId: carrito.id, productoId } });
        if (item) {
            item.cantidad += cantidad;
        }
        else {
            item = this.itemRepo.create({ carritoId: carrito.id, productoId, cantidad });
        }
        return this.itemRepo.save(item);
    }
    async eliminarItem(usuarioId, itemId) {
        const carrito = await this.obtenerOcrear(usuarioId);
        return this.itemRepo.delete({ id: itemId, carritoId: carrito.id });
    }
    async vaciar(usuarioId) {
        const carrito = await this.obtenerOcrear(usuarioId);
        return this.itemRepo.delete({ carritoId: carrito.id });
    }
};
exports.CarritoService = CarritoService;
exports.CarritoService = CarritoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carrito_entity_1.Carrito)),
    __param(1, (0, typeorm_1.InjectRepository)(item_carrito_entity_1.ItemCarrito)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CarritoService);
//# sourceMappingURL=carrito.service.js.map
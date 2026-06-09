"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ordenes_service_1 = require("./ordenes.service");
const ordenes_controller_1 = require("./ordenes.controller");
const admin_ordenes_controller_1 = require("./admin-ordenes.controller");
const orden_entity_1 = require("../../database/entities/orden.entity");
const detalle_orden_entity_1 = require("../../database/entities/detalle-orden.entity");
const carrito_module_1 = require("../carrito/carrito.module");
let OrdenesModule = class OrdenesModule {
};
exports.OrdenesModule = OrdenesModule;
exports.OrdenesModule = OrdenesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([orden_entity_1.Orden, detalle_orden_entity_1.DetalleOrden]), carrito_module_1.CarritoModule],
        controllers: [ordenes_controller_1.OrdenesController, admin_ordenes_controller_1.AdminOrdenesController],
        providers: [ordenes_service_1.OrdenesService],
        exports: [ordenes_service_1.OrdenesService],
    })
], OrdenesModule);
//# sourceMappingURL=ordenes.module.js.map
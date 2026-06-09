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
exports.OrdenesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orden_entity_1 = require("../../database/entities/orden.entity");
const detalle_orden_entity_1 = require("../../database/entities/detalle-orden.entity");
let OrdenesService = class OrdenesService {
    constructor(ordenRepo, detalleRepo) {
        this.ordenRepo = ordenRepo;
        this.detalleRepo = detalleRepo;
    }
    async crear(usuarioId, items, direccionEnvio, metodoPago) {
        const numeroOrden = `ORD-${Date.now()}-${Math.round(Math.random() * 1000)}`;
        let total = 0;
        const detalles = items.map((item) => {
            const subtotal = item.cantidad * item.precioUnitario;
            total += subtotal;
            return this.detalleRepo.create({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: item.precioUnitario, subtotal });
        });
        const orden = this.ordenRepo.create({ usuarioId, numeroOrden, total, direccionEnvio, metodoPago, detalles });
        return this.ordenRepo.save(orden);
    }
    async listarPorUsuario(usuarioId) {
        return this.ordenRepo.find({ where: { usuarioId }, relations: { detalles: { producto: true } }, order: { fechaCreacion: 'DESC' } });
    }
    async listarTodas() {
        return this.ordenRepo.find({ relations: { usuario: true, detalles: { producto: true } }, order: { fechaCreacion: 'DESC' } });
    }
    async buscarPorId(id) {
        const orden = await this.ordenRepo.findOne({ where: { id }, relations: { usuario: true, detalles: { producto: true } } });
        if (!orden)
            throw new common_1.NotFoundException('Orden no encontrada');
        return orden;
    }
    async actualizarEstado(id, estado) {
        const orden = await this.buscarPorId(id);
        orden.estado = estado;
        return this.ordenRepo.save(orden);
    }
    async obtenerIngresosPorMes() {
        return this.ordenRepo.query(`
      SELECT TO_CHAR(fecha_orden, 'YYYY-MM') as mes, SUM(total) as ingresos, COUNT(*) as total_ordenes
      FROM ordenes WHERE estado != 'CANCELADA'
      GROUP BY mes ORDER BY mes DESC LIMIT 12
    `);
    }
};
exports.OrdenesService = OrdenesService;
exports.OrdenesService = OrdenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orden_entity_1.Orden)),
    __param(1, (0, typeorm_1.InjectRepository)(detalle_orden_entity_1.DetalleOrden)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdenesService);
//# sourceMappingURL=ordenes.service.js.map
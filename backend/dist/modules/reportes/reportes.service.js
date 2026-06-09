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
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const ordenes_service_1 = require("../ordenes/ordenes.service");
const productos_service_1 = require("../productos/productos.service");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let ReportesService = class ReportesService {
    constructor(ordenesService, productosService, usuariosService) {
        this.ordenesService = ordenesService;
        this.productosService = productosService;
        this.usuariosService = usuariosService;
    }
    async obtenerDatosDashboard() {
        const [ingresosPorMes, masVendidos, clientesFrecuentes] = await Promise.all([
            this.ordenesService.obtenerIngresosPorMes(),
            this.productosService.obtenerMasVendidos(),
            this.usuariosService.obtenerEstadisticasClientesFrecuentes(),
        ]);
        return {
            ingresosPorMes,
            productosMasVendidos: masVendidos,
            clientesFrecuentes,
        };
    }
    async generarReporteVentas(formato) {
        const data = await this.obtenerDatosDashboard();
        if (formato === 'pdf') {
            return this.generarPDF(data);
        }
        return data;
    }
    async generarPDF(data) {
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.fontSize(20).text('Reporte de Ventas - Tienda Kroxi', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text('Productos Más Vendidos', { underline: true });
        doc.moveDown(0.5);
        if (data.productosMasVendidos?.length) {
            data.productosMasVendidos.forEach((p, i) => {
                doc.fontSize(11).text(`${i + 1}. ${p.nombre} - ${p.total_vendido} unidades vendidas - $${p.total_ingresos}`);
            });
        }
        else {
            doc.fontSize(11).text('Sin datos');
        }
        doc.moveDown();
        doc.fontSize(14).text('Clientes Frecuentes', { underline: true });
        doc.moveDown(0.5);
        if (data.clientesFrecuentes?.length) {
            data.clientesFrecuentes.forEach((c, i) => {
                doc.fontSize(11).text(`${i + 1}. ${c.nombre} (${c.email}) - ${c.total_ordenes} órdenes, ${c.total_reservas} reservas`);
            });
        }
        else {
            doc.fontSize(11).text('Sin datos');
        }
        doc.moveDown();
        doc.fontSize(14).text('Ingresos por Mes', { underline: true });
        doc.moveDown(0.5);
        if (data.ingresosPorMes?.length) {
            data.ingresosPorMes.forEach((m) => {
                doc.fontSize(11).text(`${m.mes}: $${m.ingresos} (${m.total_ordenes} órdenes)`);
            });
        }
        doc.end();
        return new Promise((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ordenes_service_1.OrdenesService,
        productos_service_1.ProductosService,
        usuarios_service_1.UsuariosService])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map
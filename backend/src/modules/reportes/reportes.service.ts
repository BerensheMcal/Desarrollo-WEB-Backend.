import { Injectable } from '@nestjs/common';
import { OrdenesService } from '../ordenes/ordenes.service';
import { ProductosService } from '../productos/productos.service';
import { UsuariosService } from '../usuarios/usuarios.service';

/* GENERA LOS PDF DE LOS REPORTES AQUI */

@Injectable()
export class ReportesService {
  constructor(
    private readonly ordenesService: OrdenesService,
    private readonly productosService: ProductosService,
    private readonly usuariosService: UsuariosService,
  ) {}

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

  async generarReporteVentas(formato: string) {
    const data = await this.obtenerDatosDashboard();

    if (formato === 'pdf') {
      return this.generarPDF(data);
    }

    return data;
  }

  private async generarPDF(data: any): Promise<Buffer> {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => buffers.push(chunk));

    doc.fontSize(20).text('Reporte de Ventas - Tienda Kroxi', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('Productos Más Vendidos', { underline: true });
    doc.moveDown(0.5);
    if (data.productosMasVendidos?.length) {
      data.productosMasVendidos.forEach((p: any, i: number) => {
        doc.fontSize(11).text(`${i + 1}. ${p.nombre} - ${p.total_vendido} unidades vendidas - $${p.total_ingresos}`);
      });
    } else {
      doc.fontSize(11).text('Sin datos');
    }

    doc.moveDown();
    doc.fontSize(14).text('Clientes Frecuentes', { underline: true });
    doc.moveDown(0.5);
    if (data.clientesFrecuentes?.length) {
      data.clientesFrecuentes.forEach((c: any, i: number) => {
        doc.fontSize(11).text(`${i + 1}. ${c.nombre} (${c.email}) - ${c.total_ordenes} órdenes, ${c.total_reservas} reservas`);
      });
    } else {
      doc.fontSize(11).text('Sin datos');
    }

    doc.moveDown();
    doc.fontSize(14).text('Ingresos por Mes', { underline: true });
    doc.moveDown(0.5);
    if (data.ingresosPorMes?.length) {
      data.ingresosPorMes.forEach((m: any) => {
        doc.fontSize(11).text(`${m.mes}: $${m.ingresos} (${m.total_ordenes} órdenes)`);
      });
    }

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }
}

import { ReportesService } from '../modules/reportes/reportes.service';
export declare class AdminpanelController {
    private readonly reportesService;
    constructor(reportesService: ReportesService);
    dashboard(): Promise<{
        ingresosPorMes: any;
        productosMasVendidos: any;
        clientesFrecuentes: any;
    }>;
}

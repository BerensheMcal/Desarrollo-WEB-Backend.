import { Response } from 'express';
import { ReportesService } from './reportes.service';
export declare class ReportesController {
    private readonly reportesService;
    constructor(reportesService: ReportesService);
    dashboard(): Promise<{
        ingresosPorMes: any;
        productosMasVendidos: any;
        clientesFrecuentes: any;
    }>;
    descargar(formato: string, res: Response): Promise<void>;
}

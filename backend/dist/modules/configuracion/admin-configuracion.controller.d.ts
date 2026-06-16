import { ConfiguracionService } from './configuracion.service';
export declare class AdminConfiguracionController {
    private readonly configService;
    constructor(configService: ConfiguracionService);
    listar(): Promise<import("../../database/entities/configuracion.entity").Configuracion[]>;
    actualizar(body: {
        clave: string;
        valor: string;
    }): Promise<{
        message: string;
    }>;
}

import { AuthService } from './auth.service';
export declare class IniciarSesionDto {
    email: string;
    contrasena: string;
    captchaToken?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    iniciarSesion(dto: IniciarSesionDto, req: any): Promise<{
        token: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            rol: any;
        };
    }>;
    cerrarSesion(req: any): Promise<{
        mensaje: string;
    }>;
}

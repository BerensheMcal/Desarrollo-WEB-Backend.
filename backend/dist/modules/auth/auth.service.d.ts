import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    private readonly auditoriaService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService, auditoriaService: AuditoriaService);
    validarUsuario(email: string, contrasena: string): Promise<any>;
    iniciarSesion(email: string, contrasena: string, ip: string, navegador: string): Promise<{
        token: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            rol: any;
        };
    }>;
    cerrarSesion(usuarioId: number, ip: string, navegador: string): Promise<{
        mensaje: string;
    }>;
}

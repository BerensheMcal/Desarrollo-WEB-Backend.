import { RolUsuario } from '../../../database/entities/usuario.entity';
export declare class CrearUsuarioDto {
    nombre: string;
    email: string;
    contrasena: string;
    rol?: RolUsuario;
    celular?: string;
    direccion?: string;
}

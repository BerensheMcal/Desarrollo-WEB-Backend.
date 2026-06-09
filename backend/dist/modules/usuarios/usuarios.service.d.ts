import { Repository } from 'typeorm';
import { Usuario } from '../../database/entities/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepo;
    constructor(usuarioRepo: Repository<Usuario>);
    crear(dto: CrearUsuarioDto): Promise<Usuario>;
    listar(): Promise<Usuario[]>;
    listarClientes(): Promise<Usuario[]>;
    buscarPorId(id: number): Promise<Usuario>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    actualizar(id: number, dto: ActualizarUsuarioDto): Promise<Usuario>;
    actualizarPerfil(id: number, dto: {
        nombre?: string;
        email?: string;
        contrasena?: string;
        celular?: string;
        direccion?: string;
        imagenUrl?: string;
    }): Promise<Usuario>;
    eliminarSuave(id: number): Promise<void>;
    obtenerEstadisticasClientesFrecuentes(): Promise<any>;
}

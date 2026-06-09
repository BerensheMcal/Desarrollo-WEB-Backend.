import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    crear(dto: CrearUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    listar(): Promise<import("../../database/entities/usuario.entity").Usuario[]>;
    buscarPorId(id: number): Promise<import("../../database/entities/usuario.entity").Usuario>;
    actualizar(id: number, dto: ActualizarUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    actualizarPerfil(id: number, dto: any): Promise<import("../../database/entities/usuario.entity").Usuario>;
    eliminar(id: number): Promise<void>;
}

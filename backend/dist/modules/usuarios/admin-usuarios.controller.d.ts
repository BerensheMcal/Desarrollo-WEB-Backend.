import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class AdminUsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    listar(): Promise<import("../../database/entities/usuario.entity").Usuario[]>;
    listarClientes(): Promise<import("../../database/entities/usuario.entity").Usuario[]>;
    clientesFrecuentes(): Promise<any>;
    buscarPorId(id: number): Promise<import("../../database/entities/usuario.entity").Usuario>;
    crear(dto: CrearUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    actualizar(id: number, dto: ActualizarUsuarioDto): Promise<import("../../database/entities/usuario.entity").Usuario>;
    eliminar(id: number): Promise<void>;
}

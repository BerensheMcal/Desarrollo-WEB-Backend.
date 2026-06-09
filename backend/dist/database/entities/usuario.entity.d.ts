import { EntidadBaseConEliminacion } from './entidad-base';
import { Carrito } from './carrito.entity';
import { Orden } from './orden.entity';
import { ReservaTaller } from './reserva-taller.entity';
export declare enum RolUsuario {
    ADMIN = "ADMIN",
    STAFF = "STAFF",
    CLIENTE = "CLIENTE"
}
export declare class Usuario extends EntidadBaseConEliminacion {
    nombre: string;
    email: string;
    contrasenaHash: string;
    rol: RolUsuario;
    celular: string | null;
    direccion: string | null;
    imagenUrl: string | null;
    carrito: Carrito;
    ordenes: Orden[];
    reservas: ReservaTaller[];
}

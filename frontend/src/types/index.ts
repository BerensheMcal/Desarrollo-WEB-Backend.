export type RolUsuario = 'ADMIN' | 'STAFF' | 'CLIENTE';
/*INTE VALI ,REG.AU*/
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  celular?: string;
  fechaNacimiento?: string;
  direccion?: string;
  imagenUrl?: string;
  fechaCreacion: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenPrincipalUrl?: string;
  categoria?: Categoria;
  categoriaId?: number;
  imagenes?: ImagenProducto[];
}

export interface ImagenProducto {
  id: number;
  url: string;
  orden: number;
}

export interface Carrito {
  id: number;
  usuarioId: number;
  items: ItemCarrito[];
}

export interface ItemCarrito {
  id: number;
  carritoId: number;
  productoId: number;
  producto: Producto;
  cantidad: number;
}

export interface Orden {
  id: number;
  usuarioId: number;
  usuario?: Usuario;
  numeroOrden: string;
  fechaOrden: string;
  total: number;
  totalOriginal?: number;
  descuento?: number;
  estado: EstadoOrden;
  direccionEnvio?: string;
  metodoPago?: string;
  detalles: DetalleOrden[];
}

export type EstadoOrden = 'PENDIENTE' | 'CONFIRMADA' | 'ENVIADA' | 'ENTREGADA' | 'CANCELADA';

export interface DetalleOrden {
  id: number;
  productoId: number;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Taller {
  id: number;
  nombre: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string;
  horaFin?: string;
  cuposMaximos: number;
  cuposDisponibles: number;
  precio: number;
  imagenUrl?: string;
  ubicacion?: string;
}

export interface ReservaTaller {
  id: number;
  usuarioId: number;
  tallerId: number;
  taller?: Taller;
  cantidadCupos: number;
  fechaReserva: string;
  estado: 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
}

export interface RegistroAuditoria {
  id: number;
  usuarioId: number | null;
  emailIntentado: string | null;
  direccionIp: string;
  evento: 'INGRESO_EXITOSO' | 'INGRESO_FALLIDO' | 'CIERRE_SESION';
  navegador: string | null;
  fechaHora: string;
}

export interface DatosDashboard {
  ingresosPorMes: { mes: string; ingresos: number; total_ordenes: number }[];
  productosMasVendidos: { id: number; nombre: string; precio: string; imagen_principal_url: string; total_vendido: string; total_ingresos: string }[];
  clientesFrecuentes: { id: number; nombre: string; email: string; total_ordenes: string; total_reservas: string; total_gastado: string }[];
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface FortalezaContrasena {
  nivel: 'debil' | 'intermedio' | 'fuerte';
  puntaje: number;
  color: string;
}

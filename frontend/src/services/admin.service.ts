import api from './api';
import { Categoria, Producto, Taller, Orden, DatosDashboard, RegistroAuditoria } from '../types';

export const categoriasService = {
  listar: () => api.get<Categoria[]>('/categorias'),
};

export const productosService = {
  listar: (categoria?: number) => api.get<Producto[]>('/productos', { params: { categoria } }),
  destacados: () => api.get<Producto[]>('/productos/destacados'),
  buscarPorId: (id: number) => api.get<Producto>(`/productos/${id}`),
};

export const talleresService = {
  listar: () => api.get<Taller[]>('/talleres'),
  buscarPorId: (id: number) => api.get<Taller>(`/talleres/${id}`),
};
/*    +   */
export const adminService = {
  dashboard: () => api.get<DatosDashboard>('/adminpanel/dashboard'),
  reportes: {
    obtener: () => api.get('/adminpanel/reportes/dashboard'),
    descargarPDF: () => api.get('/adminpanel/reportes/descargar?formato=pdf', { responseType: 'blob' }),
  },
  productos: {
    listar: () => api.get<Producto[]>('/adminpanel/productos'),
    crear: (data: FormData) => api.post('/adminpanel/productos', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    actualizar: (id: number, data: any) => {
      if (data instanceof FormData) {
        return api.patch(`/adminpanel/productos/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      return api.patch(`/adminpanel/productos/${id}`, data);
    },
    eliminar: (id: number) => api.delete(`/adminpanel/productos/${id}`),
    masVendidos: () => api.get('/adminpanel/productos/mas-vendidos'),
  },
  categorias: {
    listar: () => api.get<Categoria[]>('/adminpanel/categorias'),
    crear: (data: any) => api.post('/adminpanel/categorias', data),
    actualizar: (id: number, data: any) => api.patch(`/adminpanel/categorias/${id}`, data),
    eliminar: (id: number) => api.delete(`/adminpanel/categorias/${id}`),
  },
  usuarios: {
    listar: () => api.get('/adminpanel/usuarios'),
    listarClientes: () => api.get('/adminpanel/usuarios/clientes'),
    clientesFrecuentes: () => api.get('/adminpanel/usuarios/frecuentes'),
    crear: (data: any) => api.post('/adminpanel/usuarios', data),
    actualizar: (id: number, data: any) => api.patch(`/adminpanel/usuarios/${id}`, data),
    eliminar: (id: number) => api.delete(`/adminpanel/usuarios/${id}`),
  },
  ordenes: {
    listar: () => api.get<Orden[]>('/adminpanel/ordenes'),
    listarConDescuento: () => api.get<Orden[]>('/adminpanel/ordenes/con-descuento'),
    actualizarEstado: (id: number, estado: string) => api.patch(`/adminpanel/ordenes/${id}/estado`, { estado }),
  },
  talleres: {
    listar: () => api.get<Taller[]>('/adminpanel/talleres'),
    crear: (data: any) => {
      if (data instanceof FormData) {
        return api.post('/adminpanel/talleres', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      return api.post('/adminpanel/talleres', data);
    },
    actualizar: (id: number, data: any) => {
      if (data instanceof FormData) {
        return api.patch(`/adminpanel/talleres/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      return api.patch(`/adminpanel/talleres/${id}`, data);
    },
    eliminar: (id: number) => api.delete(`/adminpanel/talleres/${id}`),
  },
  auditoria: {
    listar: () => api.get<RegistroAuditoria[]>('/adminpanel/auditoria'),
  },
  configuracion: {
    listar: () => api.get('/adminpanel/configuracion'),
    actualizar: (clave: string, valor: string) => api.put('/adminpanel/configuracion', { clave, valor }),
  },
};

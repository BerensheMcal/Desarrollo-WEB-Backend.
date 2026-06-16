import api from './api';
import { AuthResponse } from '../types';

export const authService = {
  async iniciarSesion(email: string, contrasena: string, captchaToken: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/iniciar-sesion', { email, contrasena, captchaToken });
    return data;
  },

  async cerrarSesion(): Promise<void> {
    await api.post('/auth/cerrar-sesion');
  },

  async registrar(datos: { nombre: string; email: string; contrasena: string; celular?: string; fechaNacimiento?: string }): Promise<void> {
    await api.post('/usuarios', datos);
  },
};

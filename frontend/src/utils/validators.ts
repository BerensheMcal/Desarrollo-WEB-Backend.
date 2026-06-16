import { FortalezaContrasena } from '../types';

export function evaluarFortalezaContrasena(contrasena: string): FortalezaContrasena {
  let puntaje = 0;

  if (contrasena.length >= 8) puntaje += 25;
  if (contrasena.length >= 12) puntaje += 15;
  if (/[a-z]/.test(contrasena)) puntaje += 15;
  if (/[A-Z]/.test(contrasena)) puntaje += 15;
  if (/[0-9]/.test(contrasena)) puntaje += 15;
  if (/[^a-zA-Z0-9]/.test(contrasena)) puntaje += 15;

  if (puntaje >= 80) return { nivel: 'fuerte', puntaje, color: '#22c55e' };
  if (puntaje >= 50) return { nivel: 'intermedio', puntaje, color: '#eab308' };
  return { nivel: 'debil', puntaje, color: '#ef4444' };
}

export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarCelular(celular: string): boolean {
  return /^\+?[\d\s()-]{7,20}$/.test(celular);
}
/* VALIDACIONES USUARIOS */
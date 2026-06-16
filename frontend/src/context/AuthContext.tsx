import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '../types';
/* CONTEXTO DE AUTENTICACIÓN */
interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  estaAutenticado: boolean;
  esAdmin: boolean;
  esStaff: boolean;
  iniciarSesion: (usuario: Usuario, token: string) => void;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const iniciarSesion = (usuario: Usuario, token: string) => {
    setUsuario(usuario);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  const estaAutenticado = !!token && !!usuario;
  const esAdmin = usuario?.rol === 'ADMIN';
  const esStaff = usuario?.rol === 'STAFF';

  return (
    <AuthContext.Provider value={{ usuario, token, estaAutenticado, esAdmin, esStaff, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}

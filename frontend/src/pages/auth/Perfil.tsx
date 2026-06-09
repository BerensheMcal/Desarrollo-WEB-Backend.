import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { FiEye, FiEyeOff, FiSave } from 'react-icons/fi';
import '../../styles/auth.css';

export default function Perfil() {
  const { usuario } = useAuth();
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [celular, setCelular] = useState(usuario?.celular || '');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);
  const [verContrasena, setVerContrasena] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setExito('');
    if (!nombre.trim()) { setError('El nombre es requerido'); return; }
    if (!email.trim()) { setError('El email es requerido'); return; }
    if (contrasena && contrasena.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return; }
    if (contrasena && contrasena !== confirmarContrasena) { setError('Las contraseñas no coinciden'); return; }

    setCargando(true);
    try {
      const data: any = { nombre, email };
      if (celular !== usuario?.celular) data.celular = celular || null;
      if (contrasena) data.contrasena = contrasena;
      await api.patch(`/usuarios/${usuario!.id}/perfil`, data);
      const stored = JSON.parse(localStorage.getItem('usuario') || '{}');
      stored.nombre = nombre;
      stored.email = email;
      stored.celular = celular;
      localStorage.setItem('usuario', JSON.stringify(stored));
      setExito('Perfil actualizado correctamente');
      setContrasena('');
      setConfirmarContrasena('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar perfil');
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="auth-tarjeta animacion-fade-in">
        <div className="auth-header">
          <h1>Mi Perfil</h1>
          <p>Actualiza tus datos personales</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {exito && <div className="auth-exito" style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: 'var(--radio)', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{exito}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-grupo">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="celular">Celular</label>
            <input id="celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="+54 11 1234-5678" style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="contrasena">Nueva Contraseña <span style={{ fontWeight: 400, color: 'var(--color-texto-secundario)' }}>(dejar vacío para no cambiar)</span></label>
            <div style={{ position: 'relative' }}>
              <input id="contrasena" type={verContrasena ? 'text' : 'password'} value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Mínimo 8 caracteres" style={{ ...inputStyle, paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setVerContrasena(!verContrasena)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-secundario)', padding: 0, display: 'flex' }}>
                {verContrasena ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="input-grupo">
            <label htmlFor="confirmar">Confirmar Nueva Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input id="confirmar" type={verConfirmar ? 'text' : 'password'} value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} placeholder="Repite la contraseña" style={{ ...inputStyle, paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setVerConfirmar(!verConfirmar)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-secundario)', padding: 0, display: 'flex' }}>
                {verConfirmar ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primario btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', gap: '0.5rem' }} disabled={cargando}>
            <FiSave size={18} /> {cargando ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
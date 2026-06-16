import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { evaluarFortalezaContrasena, validarEmail } from '../../utils/validators';
import { FortalezaContrasena } from '../../types';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CaptchaWidget from '../../components/common/CaptchaWidget';
import '../../styles/auth.css';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [fortaleza, setFortaleza] = useState<FortalezaContrasena | null>(null);
  const [verContrasena, setVerContrasena] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const [captchaVerificado, setCaptchaVerificado] = useState(false);
  const navigate = useNavigate();

  const manejarCambioContrasena = (valor: string) => {
    setContrasena(valor);
    if (valor.length > 0) {
      setFortaleza(evaluarFortalezaContrasena(valor));
    } else {
      setFortaleza(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim()) { setError('El nombre es requerido'); return; }
    if (!validarEmail(email)) { setError('Email inválido'); return; }
    if (contrasena.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return; }
    if (fortaleza && fortaleza.nivel === 'debil') { setError('La contraseña es muy débil'); return; }
    if (contrasena !== confirmarContrasena) { setError('Las contraseñas no coinciden'); return; }
    if (!captchaVerificado) { setError('Por favor verifica que no eres un robot'); return; }

    setCargando(true);
    try {
      await authService.registrar({ nombre, email, contrasena, celular: celular || undefined, fechaNacimiento: fechaNacimiento || undefined });
      navigate('/auth/iniciar-sesion', { state: { registrado: true } });
    } catch (err: any) {
      setError(err.response?.data?.message?.[0] || err.response?.data?.message || 'Error al registrarse');
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div className="auth-contenedor">
      <div className="auth-tarjeta animacion-fade-in">
        <div className="auth-header">
          <h1>Crear Cuenta</h1>
          <p>Regístrate en Tienda Kroxi</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-grupo">
            <label htmlFor="nombre">Nombre Completo</label>
            <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" required style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="celular">Celular</label>
            <input id="celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="+54 11 1234-5678" style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input id="fechaNacimiento" type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} style={inputStyle} />
          </div>

          <div className="input-grupo">
            <label htmlFor="contrasena">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input id="contrasena" type={verContrasena ? 'text' : 'password'} value={contrasena} onChange={(e) => manejarCambioContrasena(e.target.value)} placeholder="Mínimo 8 caracteres" required style={{ ...inputStyle, paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setVerContrasena(!verContrasena)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-secundario)', padding: 0, display: 'flex' }}>
                {verContrasena ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {fortaleza && (
              <>
                <div className="fortaleza-barra" style={{ width: `${fortaleza.puntaje}%`, background: fortaleza.color }} />
                <span className="fortaleza-texto" style={{ color: fortaleza.color }}>
                  {fortaleza.nivel === 'fuerte' ? 'Contraseña fuerte' : fortaleza.nivel === 'intermedio' ? 'Contraseña intermedia' : 'Contraseña débil'}
                </span>
              </>
            )}
          </div>

          <div className="input-grupo">
            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input id="confirmar" type={verConfirmar ? 'text' : 'password'} value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} placeholder="Repite la contraseña" required style={{ ...inputStyle, paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setVerConfirmar(!verConfirmar)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-secundario)', padding: 0, display: 'flex' }}>
                {verConfirmar ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <CaptchaWidget onVerify={() => setCaptchaVerificado(true)} />

          <button type="submit" className="btn btn-primario btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={cargando || !captchaVerificado}>
            {cargando ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/auth/iniciar-sesion">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
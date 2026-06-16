import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { validarEmail } from '../../utils/validators';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CaptchaWidget from '../../components/common/CaptchaWidget';
import '../../styles/auth.css';

/* VALI LOGIN O */

export default function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [verContrasena, setVerContrasena] = useState(false);
  const [captchaVerificado, setCaptchaVerificado] = useState(false);
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaVerificado) {
      setError('Por favor verifica que no eres un robot');
      return;
    }
    if (!validarEmail(email)) {
      setError('Email inválido');
      return;
    }
    if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setCargando(true);
    try {
      const { token, usuario } = await authService.iniciarSesion(email, contrasena, 'verificado');
      iniciarSesion(usuario, token);
      if (usuario.rol === 'ADMIN' || usuario.rol === 'STAFF') {
        navigate('/adminpanel');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-contenedor">
      <div className="auth-tarjeta animacion-fade-in">
        <div className="auth-header">
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta en Tienda Kroxi</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-grupo">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="input-grupo">
            <label htmlFor="contrasena">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                id="contrasena"
                type={verContrasena ? 'text' : 'password'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', paddingRight: '2.5rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setVerContrasena(!verContrasena)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-secundario)', padding: 0, display: 'flex' }}
              >
                {verContrasena ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <CaptchaWidget onVerify={() => setCaptchaVerificado(true)} />

          <button
            type="submit"
            className="btn btn-primario btn-lg"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            disabled={cargando || !captchaVerificado}
          >
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-footer">
          ¿No tienes cuenta? <Link to="/auth/registro">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { talleresService } from '../../services/admin.service';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Taller } from '../../types';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUsers, FiCheck } from 'react-icons/fi';

export default function DetalleTaller() {
  const { id } = useParams<{ id: string }>();
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [taller, setTaller] = useState<Taller | null>(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [reservando, setReservando] = useState(false);
  const [reservado, setReservado] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      talleresService.buscarPorId(Number(id)).then(({ data }) => {
        setTaller(data);
        setCargando(false);
      });
    }
  }, [id]);

  const reservar = async () => {
    if (!estaAutenticado) {
      navigate('/auth/iniciar-sesion');
      return;
    }
    if (!taller || cantidad < 1 || cantidad > taller.cuposDisponibles) return;
    setReservando(true);
    setError('');
    try {
      await api.post(`/reservas/${taller.id}/${cantidad}`);
      setReservado(true);
      const { data } = await talleresService.buscarPorId(taller.id);
      setTaller(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al reservar');
    } finally {
      setReservando(false);
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;
  if (!taller) return <div style={{ padding: '4rem', textAlign: 'center' }}>Taller no encontrado</div>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/talleres" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-texto-secundario)' }}>
        <FiArrowLeft /> Volver a talleres
      </Link>

      <div className="animacion-fade-in">
        {taller.imagenUrl && (
          <img src={`http://localhost:3000${taller.imagenUrl}`} alt={taller.nombre} style={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 'var(--radio-lg)', marginBottom: '1.5rem' }} />
        )}
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{taller.nombre}</h1>
        <p style={{ color: 'var(--color-texto-secundario)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{taller.descripcion}</p>

        <div className="tarjeta" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCalendar /> {new Date(taller.fechaInicio).toLocaleDateString()} - {new Date(taller.fechaFin).toLocaleDateString()}</span>
          {taller.horaInicio && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiClock /> {taller.horaInicio} - {taller.horaFin}</span>}
          {taller.ubicacion && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiMapPin /> {taller.ubicacion}</span>}
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiUsers /> {taller.cuposDisponibles} / {taller.cuposMaximos} cupos disponibles</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primario)', marginTop: '0.5rem' }}>${Number(taller.precio).toFixed(2)} por persona</span>
        </div>

        {reservado ? (
          <div style={{ textAlign: 'center', padding: '2rem', background: '#dcfce7', borderRadius: 'var(--radio)', color: '#166534' }}>
            <FiCheck size={40} style={{ marginBottom: '0.75rem' }} />
            <h3>¡Reserva confirmada!</h3>
            <p>Tu reserva en {taller.nombre} ha sido procesada exitosamente.</p>
            <Link to="/talleres" className="btn btn-primario" style={{ marginTop: '1rem' }}>Ver más talleres</Link>
          </div>
        ) : (
          <>
            {error && <div style={{ background: '#fef2f2', color: '#991b1b', padding: '0.75rem', borderRadius: 'var(--radio)', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
            {taller.cuposDisponibles > 0 ? (
              <div className="tarjeta" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label style={{ fontWeight: 500 }}>Cupos:</label>
                  <input type="number" min={1} max={taller.cuposDisponibles} value={cantidad} onChange={(e) => setCantidad(Math.min(Math.max(1, Number(e.target.value)), taller.cuposDisponibles))} style={{ width: 70, padding: '0.5rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', textAlign: 'center' }} />
                </div>
                <button className="btn btn-primario btn-lg" onClick={reservar} disabled={reservando}>
                  {reservando ? 'Reservando...' : `Reservar $${(Number(taller.precio) * cantidad).toFixed(2)}`}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fef2f2', borderRadius: 'var(--radio)', color: '#991b1b' }}>
                No hay cupos disponibles para este taller
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
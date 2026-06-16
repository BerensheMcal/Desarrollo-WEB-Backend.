import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { talleresService } from '../../services/admin.service';
import { Taller } from '../../types';
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { getImagenUrl } from '../../utils/imageUrl';

export default function Talleres() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    talleresService.listar().then(({ data }) => {
      setTalleres(data);
      setCargando(false);
    });
  }, []);

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animacion-fade-in">
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Talleres de Pintura</h1>
        <p style={{ color: 'var(--color-texto-secundario)' }}>Aprende técnicas profesionales con nuestros artistas</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {talleres.map((taller) => (
          <div key={taller.id} className="tarjeta animacion-slide-up" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{height: 350, borderRadius: 'var(--radio)', overflow: 'hidden', marginBottom: '1rem', background: 'var(--color-fondo)' }}>
              <img
                src={getImagenUrl(taller.imagenUrl) || 'https://via.placeholder.com/400x200?text=Taller'}
                alt={taller.nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{taller.nombre}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)', marginBottom: '1rem', flex: 1 }}>
              {taller.descripcion}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8125rem', color: 'var(--color-texto-secundario)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCalendar size={14} /> {(taller.fechaInicio+'').split('T')[0]} - {(taller.fechaFin+'').split('T')[0]}</span>
              {taller.horaInicio && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiClock size={14} /> {taller.horaInicio} - {taller.horaFin}</span>}
              {taller.ubicacion && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiMapPin size={14} /> {taller.ubicacion}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiUsers size={14} /> {taller.cuposDisponibles} / {taller.cuposMaximos} cupos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primario)' }}>Bs{Number(taller.precio).toFixed(2)}</span>
              <Link to={`/talleres/${taller.id}`} className="btn btn-primario btn-sm" style={{ opacity: taller.cuposDisponibles === 0 ? 0.5 : 1 }}>Reservar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

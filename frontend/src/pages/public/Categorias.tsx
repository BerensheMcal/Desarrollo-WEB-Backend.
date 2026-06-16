import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriasService } from '../../services/admin.service';
import { Categoria } from '../../types';
import { FiGrid } from 'react-icons/fi';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    categoriasService.listar().then(({ data }) => {
      setCategorias(data);
      setCargando(false);
    });
  }, []);

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div className="animacion-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <FiGrid size={36} style={{ color: 'var(--color-primario)', marginBottom: '0.5rem' }} />
        <h1>Categorías</h1>
        <p style={{ color: 'var(--color-texto-secundario)' }}>Explora nuestras categorías de productos</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {categorias.map((c, i) => (
          <Link
            to={`/productos?categoria=${c.id}`}
            key={c.id}
            className="tarjeta animacion-slide-up"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primario)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-borde)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radio)', background: 'var(--color-primario-claro, #eef2ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primario)', fontWeight: 700, fontSize: '1.25rem' }}>
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{c.nombre}</h3>
              {c.descripcion && <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--color-texto-secundario)' }}>{c.descripcion}</p>}
            </div>
          </Link>
        ))}
        {categorias.length === 0 && <p style={{ textAlign: 'center', color: 'var(--color-texto-secundario)' }}>No hay categorías disponibles</p>}
      </div>
    </div>
  );
}
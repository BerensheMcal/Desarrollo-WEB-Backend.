import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productosService } from '../../services/admin.service';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Producto } from '../../types';
import { FiArrowLeft, FiShoppingCart, FiCheck } from 'react-icons/fi';

export default function DetalleProducto() {
  const { id } = useParams<{ id: string }>();
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
  const [agregando, setAgregando] = useState(false);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (id) {
      productosService.buscarPorId(Number(id)).then(({ data }) => {
        setProducto(data);
        setCargando(false);
      });
    }
  }, [id]);

  const agregarAlCarrito = async () => {
    if (!estaAutenticado) {
      navigate('/auth/iniciar-sesion');
      return;
    }
    setAgregando(true);
    try {
      await api.post(`/carrito/agregar/${id}/1`);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    } catch {
      alert('Error al agregar al carrito');
    } finally {
      setAgregando(false);
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;
  if (!producto) return <div style={{ padding: '4rem', textAlign: 'center' }}>Producto no encontrado</div>;

  const imagenes = [producto.imagenPrincipalUrl, ...(producto.imagenes?.map((i) => i.url) || [])].filter(Boolean);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/productos" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-texto-secundario)' }}>
        <FiArrowLeft /> Volver a productos
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <div
            style={{ borderRadius: 'var(--radio-lg)', overflow: 'hidden', cursor: 'pointer', background: 'var(--color-fondo)', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setImagenAmpliada(producto.imagenPrincipalUrl || null)}
          >
            <img
              src={producto.imagenPrincipalUrl ? `http://localhost:3000${producto.imagenPrincipalUrl}` : 'https://via.placeholder.com/500x500?text=Sin+Imagen'}
              alt={producto.nombre}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          {imagenes.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              {imagenes.map((url, i) => (
                <img
                  key={i}
                  src={`http://localhost:3000${url}`}
                  alt=""
                  style={{ width: 64, height: 64, borderRadius: 'var(--radio)', objectFit: 'cover', cursor: 'pointer', border: '2px solid var(--color-borde)' }}
                  onClick={() => setImagenAmpliada(url || null)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="animacion-slide-right">
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primario)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {producto.categoria?.nombre || 'Sin categoría'}
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.5rem 0' }}>{producto.nombre}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primario)', marginBottom: '1rem' }}>
            ${Number(producto.precio).toFixed(2)}
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className={`badge ${producto.stock > 0 ? 'badge-exito' : 'badge-peligro'}`}>
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'}
            </span>
          </div>
          <p style={{ color: 'var(--color-texto-secundario)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {producto.descripcion || 'Sin descripción disponible'}
          </p>
          <button
            className={`btn ${agregado ? 'btn-exito' : 'btn-primario'} btn-lg`}
            style={{ gap: '0.75rem' }}
            disabled={producto.stock === 0 || agregando}
            onClick={agregarAlCarrito}
          >
            {agregado ? <><FiCheck size={20} /> Agregado</> : <><FiShoppingCart size={20} /> Agregar al Carrito</>}
          </button>
        </div>
      </div>

      {imagenAmpliada && (
        <div className="imagen-ampliada-overlay" onClick={() => setImagenAmpliada(null)}>
          <div className="imagen-ampliada-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="imagen-ampliada-cerrar" onClick={() => setImagenAmpliada(null)}>×</button>
            <img src={`http://localhost:3000${imagenAmpliada}`} alt="Imagen ampliada" />
          </div>
        </div>
      )}
    </div>
  );
}
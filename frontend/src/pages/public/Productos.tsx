import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productosService, categoriasService } from '../../services/admin.service';
import { Producto, Categoria } from '../../types';
import { FiSearch } from 'react-icons/fi';
import '../../styles/productos.css';

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | undefined>(
    categoriaParam ? Number(categoriaParam) : undefined
  );
  const [busqueda, setBusqueda] = useState('');
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  useEffect(() => {
    categoriasService.listar().then(({ data }) => setCategorias(data));
  }, []);

  useEffect(() => {
    productosService.listar(categoriaSeleccionada).then(({ data }) => setProductos(data));
  }, [categoriaSeleccionada]);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-page">
      <div className="productos-header animacion-fade-in">
        <h1>Productos</h1>
        <p>Explora nuestra colección de miniaturas</p>
      </div>

      <div className="productos-filtros">
        <div className="productos-busqueda">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="productos-categorias">
          <button
            className={`categoria-chip ${!categoriaSeleccionada ? 'activo' : ''}`}
            onClick={() => { setCategoriaSeleccionada(undefined); setSearchParams({}); }}
          >
            Todas
          </button>
          {categorias.map((c) => (
            <button
              key={c.id}
              className={`categoria-chip ${categoriaSeleccionada === c.id ? 'activo' : ''}`}
              onClick={() => { setCategoriaSeleccionada(c.id); setSearchParams({ categoria: String(c.id) }); }}
            >
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((p) => (
          <div key={p.id} className="producto-tarjeta animacion-slide-up">
            <div className="producto-imagen" onClick={() => setImagenAmpliada(p.imagenPrincipalUrl || null)}>
              <img
                src={p.imagenPrincipalUrl ? `http://localhost:3000${p.imagenPrincipalUrl}` : 'https://via.placeholder.com/300x300?text=Sin+Imagen'}
                alt={p.nombre}
              />
              <div className="producto-imagen-overlay">
                <span>Ver imagen</span>
              </div>
            </div>
            <div className="producto-info">
              <span className="producto-categoria">{p.categoria?.nombre}</span>
              <h3>{p.nombre}</h3>
              <p className="producto-descripcion">{p.descripcion}</p>
              <div className="producto-footer">
                <span className="producto-precio">Bs{Number(p.precio).toFixed(2)}</span>
                <span className={`producto-stock ${p.stock > 0 ? 'disponible' : 'agotado'}`}>
                  {p.stock > 0 ? `${p.stock} en stock` : 'Agotado'}
                </span>
              </div>
              <Link to={`/productos/${p.id}`} className="btn btn-primario btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Ver Detalle
              </Link>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="productos-vacio">
          <p>No se encontraron productos</p>
        </div>
      )}

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

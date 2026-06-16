import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiStar } from 'react-icons/fi';
import { productosService } from '../../services/admin.service';
import { Producto } from '../../types';
import { getImagenUrl } from '../../utils/imageUrl';
import '../../styles/landing.css';

export default function Landing() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [indiceCarrusel, setIndiceCarrusel] = useState(0);

  useEffect(() => {
    productosService.destacados().then(({ data }) => setProductos(data));
  }, []);

  useEffect(() => {
    if (productos.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceCarrusel((prev) => (prev + 1) % Math.min(productos.length, 5));
    }, 4000);
    return () => clearInterval(intervalo);
  }, [productos]);

  const productosCarrusel = productos.slice(0, 5);

  return (
    <div>
      <section className="hero">
        <div className="hero-contenido animacion-fade-in">
          <h1>Bienvenido a Tienda Kroxi</h1>
          <p>Descubre nuestra colección de miniaturas para coleccionistas y entusiastas del modelismo.</p>
          <div className="hero-acciones">
            <Link to="/productos" className="btn btn-primario btn-lg">
              Ver Productos <FiArrowRight />
            </Link>
            <Link to="/talleres" className="btn btn-outline btn-lg">
              Próximos Talleres
            </Link>
          </div>
        </div>
      </section>

      {productosCarrusel.length > 0 && (
        <section className="carrusel-seccion">
          <h2 className="seccion-titulo">Productos Destacados</h2>
          <div className="carrusel">
            <div
              className="carrusel-track"
              style={{ transform: `translateX(-${indiceCarrusel * 100}%)` }}
            >
              {productosCarrusel.map((p) => (
                <div key={p.id} className="carrusel-slide">
                  <div className="carrusel-imagen">
                    <img
                      src={getImagenUrl(p.imagenPrincipalUrl) || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
                      alt={p.nombre}
                    />
                  </div>
                  <div className="carrusel-info">
                    <h3>{p.nombre}</h3>
                    <p className="carrusel-precio">Bs{Number(p.precio).toFixed(2)}</p>
                    <Link to={`/productos/${p.id}`} className="btn btn-primario">
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="carrusel-dots">
              {productosCarrusel.map((_, i) => (
                <button
                  key={i}
                  className={`carrusel-dot ${i === indiceCarrusel ? 'activo' : ''}`}
                  onClick={() => setIndiceCarrusel(i)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="caracteristicas">
        <div className="caracteristicas-grid">
          <div className="caracteristica-tarjeta animacion-slide-up">
            <FiPackage size={32} />
            <h3>Miniaturas Exclusivas</h3>
            <p>Amplia selección de miniaturas para todos los gustos y niveles.</p>
          </div>
          <div className="caracteristica-tarjeta animacion-slide-up">
            <FiStar size={32} />
            <h3>Talleres de Pintura</h3>
            <p>Aprende técnicas de pintura con nuestros expertos artistas.</p>
          </div>
          <div className="caracteristica-tarjeta animacion-slide-up">
            <FiArrowRight size={32} />
            <h3>Envíos Rápidos</h3>
            <p>Recibe tus pedidos en la puerta de tu casa en tiempo récord.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

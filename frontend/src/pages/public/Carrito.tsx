import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Carrito as CarritoType } from '../../types';
import { FiTrash2, FiShoppingBag, FiCheck, FiCreditCard, FiGift } from 'react-icons/fi';

export default function Carrito() {
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<CarritoType | null>(null);
  const [cargando, setCargando] = useState(true);
  const [pagando, setPagando] = useState(false);
  const [pagado, setPagado] = useState(false);
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [direccion, setDireccion] = useState('');
  const [mostrarPago, setMostrarPago] = useState(false);
  const [descuentoInfo, setDescuentoInfo] = useState<{ tieneDescuento: boolean; porcentaje: number; totalOrdenes: number; totalProductos: number } | null>(null);

  useEffect(() => {
    if (estaAutenticado) {
      Promise.all([
        api.get('/carrito'),
        api.get('/ordenes/descuento-cliente-frecuente'),
      ]).then(([carritoRes, descuentoRes]) => {
        setCarrito(carritoRes.data);
        setDescuentoInfo(descuentoRes.data);
        setCargando(false);
      });
    }
  }, [estaAutenticado]);

  const eliminarItem = async (itemId: number) => {
    await api.delete(`/carrito/item/${itemId}`);
    const { data } = await api.get('/carrito');
    setCarrito(data);
  };

  const vaciarCarrito = async () => {
    await api.delete('/carrito');
    setCarrito(null);
  };

  const procesarPago = async () => {
    if (!carrito?.items?.length) return;
    setPagando(true);
    try {
      const items = carrito.items.map((item) => ({
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: Number(item.producto?.precio || 0),
      }));
      await api.post('/ordenes', { items, direccionEnvio: direccion || undefined, metodoPago });
      await api.delete('/carrito');
      setPagado(true);
      setTimeout(() => navigate('/productos'), 3000);
    } catch {
      alert('Error al procesar el pago');
    } finally {
      setPagando(false);
    }
  };

  if (!estaAutenticado) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <FiShoppingBag size={48} style={{ color: 'var(--color-texto-secundario)', marginBottom: '1rem' }} />
        <h2>Inicia sesión para ver tu carrito</h2>
        <Link to="/auth/iniciar-sesion" className="btn btn-primario" style={{ marginTop: '1rem' }}>Iniciar Sesión</Link>
      </div>
    );
  }

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  if (pagado) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }} className="animacion-fade-in">
        <FiCheck size={64} style={{ color: '#22c55e', marginBottom: '1rem' }} />
        <h2>¡Pago Exitoso!</h2>
        <p style={{ color: 'var(--color-texto-secundario)', marginBottom: '1rem' }}>Tu orden ha sido procesada correctamente.</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)' }}>Redirigiendo a productos...</p>
      </div>
    );
  }

  if (!carrito || !carrito.items?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <FiShoppingBag size={48} style={{ color: 'var(--color-texto-secundario)', marginBottom: '1rem' }} />
        <h2>Tu carrito está vacío</h2>
        <p style={{ color: 'var(--color-texto-secundario)', marginBottom: '1rem' }}>Explora nuestros productos y agrega lo que más te guste</p>
        <Link to="/productos" className="btn btn-primario">Ver Productos</Link>
      </div>
    );
  }

  const subtotal = carrito.items.reduce((sum, item) => sum + (Number(item.producto?.precio || 0) * item.cantidad), 0);
  const descuentoMonto = descuentoInfo?.tieneDescuento ? Math.round(subtotal * (descuentoInfo.porcentaje / 100) * 100) / 100 : 0;
  const total = subtotal - descuentoMonto;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Carrito de Compras</h1>
        {!mostrarPago && <button className="btn btn-peligro btn-sm" onClick={vaciarCarrito}>Vaciar Carrito</button>}
      </div>

      {descuentoInfo && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radio)', marginBottom: '1rem', fontSize: '0.875rem', background: descuentoInfo.tieneDescuento ? '#dcfce7' : '#fef9c3', color: descuentoInfo.tieneDescuento ? '#166534' : '#854d0e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FiGift size={16} />
            {descuentoInfo.tieneDescuento
              ? `¡Felicidades! Tienes un descuento del ${descuentoInfo.porcentaje}% por ser cliente frecuente.`
              : `Acumula 10 compras para obtener un descuento del ${descuentoInfo.porcentaje}%.`}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.15rem' }}>
            <span>Productos comprados: {descuentoInfo.totalProductos} / 10</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {carrito.items.map((item) => (
          <div key={item.id} className="tarjeta animacion-slide-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={item.producto?.imagenPrincipalUrl ? `http://localhost:3000${item.producto.imagenPrincipalUrl}` : 'https://via.placeholder.com/80x80'}
              alt=""
              style={{ width: 80, height: 80, borderRadius: 'var(--radio)', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.producto?.nombre}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)' }}>Cantidad: {item.cantidad}</p>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Bs{(Number(item.producto?.precio || 0) * item.cantidad).toFixed(2)}</span>
            {!mostrarPago && <button className="btn btn-peligro btn-sm" onClick={() => eliminarItem(item.id)}><FiTrash2 /></button>}
          </div>
        ))}
      </div>

      {mostrarPago ? (
        <div className="tarjeta animacion-slide-up" style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCreditCard /> Simular Pago</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Dirección de envío</label>
              <input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, ciudad" style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Método de pago</label>
              <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)' }}>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="efectivo">Pago en Efectivo</option>
              </select>
            </div>
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-borde)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-texto-secundario)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {descuentoMonto > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#166534' }}>
                  <span>Descuento ({descuentoInfo?.porcentaje}%)</span>
                  <span>-${descuentoMonto.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-borde)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total a pagar</span>
                <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bs{total.toFixed(2)}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setMostrarPago(false)}>Cancelar</button>
              <button className="btn btn-primario btn-lg" onClick={procesarPago} disabled={pagando} style={{ gap: '0.5rem' }}>
                {pagando ? 'Procesando...' : <><FiCreditCard /> Pagar Bs{total.toFixed(2)}</>}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="tarjeta" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)' }}>Total</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>${total.toFixed(2)}</p>
          </div>
          <button className="btn btn-primario btn-lg" onClick={() => setMostrarPago(true)}>Proceder al Pago</button>
        </div>
      )}
    </div>
  );
}

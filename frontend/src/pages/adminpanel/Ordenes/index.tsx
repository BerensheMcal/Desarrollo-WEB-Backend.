import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { Orden, EstadoOrden } from '../../../types';
import { FiPercent, FiX } from 'react-icons/fi';

const mapEstado = { PENDIENTE: 'badge-advertencia', CONFIRMADA: 'badge-info', ENVIADA: 'badge-info', ENTREGADA: 'badge-exito', CANCELADA: 'badge-peligro' };

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [cargando, setCargando] = useState(true);
  const [ordenesDescuento, setOrdenesDescuento] = useState<Orden[]>([]);
  const [mostrarDescuentos, setMostrarDescuentos] = useState(false);

  useEffect(() => {
    Promise.all([
      adminService.ordenes.listar(),
      adminService.ordenes.listarConDescuento(),
    ]).then(([res, resDesc]) => {
      setOrdenes(res.data);
      setOrdenesDescuento(resDesc.data);
      setCargando(false);
    });
  }, []);

  const cambiarEstado = async (id: number, estado: EstadoOrden) => {
    await adminService.ordenes.actualizarEstado(id, estado);
    const { data } = await adminService.ordenes.listar();
    setOrdenes(data);
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div className="animacion-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Órdenes</h1><p>Gestión de pedidos de clientes</p></div>
        {ordenesDescuento.length > 0 && (
          <button className="btn btn-outline" onClick={() => setMostrarDescuentos(!mostrarDescuentos)} style={{ gap: '0.5rem' }}>
            <FiPercent /> {mostrarDescuentos ? 'Ver todas' : `Descuentos (${ordenesDescuento.length})`}
          </button>
        )}
      </div>

      {mostrarDescuentos && (
        <div className="tarjeta" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiPercent /> Órdenes con Descuento</h3>
            <button className="btn btn-outline btn-sm" onClick={() => setMostrarDescuentos(false)}><FiX /></button>
          </div>
          {ordenesDescuento.length === 0 ? (
            <p style={{ color: 'var(--color-texto-secundario)' }}>No hay órdenes con descuento aún.</p>
          ) : (
            <table className="tabla-admin">
              <thead>
                <tr><th>#</th><th>Cliente</th><th>Email</th><th>Total Original</th><th>Descuento</th><th>Total Pagado</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {ordenesDescuento.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600 }}>{o.numeroOrden}</td>
                    <td>{o.usuario?.nombre || '-'}</td>
                    <td>{o.usuario?.email || '-'}</td>
                    <td>${Number(o.totalOriginal).toFixed(2)}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>-${Number(o.descuento).toFixed(2)}</td>
                    <td style={{ fontWeight: 700 }}>${Number(o.total).toFixed(2)}</td>
                    <td>{new Date(o.fechaOrden).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <table className="tabla-admin">
        <thead>
          <tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Descuento</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id} style={{ background: o.descuento ? '#f0fdf4' : undefined }}>
              <td style={{ fontWeight: 600 }}>{o.numeroOrden}</td>
              <td>{o.usuario?.nombre || '-'}</td>
              <td>{new Date(o.fechaOrden).toLocaleDateString()}</td>
              <td style={{ fontWeight: 700 }}>
                {o.descuento ? (
                  <span style={{ textDecoration: 'line-through', color: 'var(--color-texto-secundario)', fontWeight: 400, marginRight: '0.25rem' }}>
                    ${Number(o.totalOriginal).toFixed(2)}
                  </span>
                ) : null}
                ${Number(o.total).toFixed(2)}
              </td>
              <td>{o.descuento ? <span style={{ color: '#16a34a', fontWeight: 600 }}>-${Number(o.descuento).toFixed(2)}</span> : '-'}</td>
              <td><span className={`badge ${mapEstado[o.estado]}`}>{o.estado}</span></td>
              <td>
                <select value={o.estado} onChange={(e) => cambiarEstado(o.id, e.target.value as EstadoOrden)} style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radio)', border: '1.5px solid var(--color-borde)', fontSize: '0.75rem' }}>
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="CONFIRMADA">Confirmada</option>
                  <option value="ENVIADA">Enviada</option>
                  <option value="ENTREGADA">Entregada</option>
                  <option value="CANCELADA">Cancelada</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

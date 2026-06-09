import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { Orden, EstadoOrden } from '../../../types';
import { FiEye } from 'react-icons/fi';

const mapEstado = { PENDIENTE: 'badge-advertencia', CONFIRMADA: 'badge-info', ENVIADA: 'badge-info', ENTREGADA: 'badge-exito', CANCELADA: 'badge-peligro' };

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    adminService.ordenes.listar().then(({ data }) => { setOrdenes(data); setCargando(false); });
  }, []);

  const cambiarEstado = async (id: number, estado: EstadoOrden) => {
    await adminService.ordenes.actualizarEstado(id, estado);
    const { data } = await adminService.ordenes.listar();
    setOrdenes(data);
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div className="animacion-fade-in">
      <div className="admin-header"><h1>Órdenes</h1><p>Gestión de pedidos de clientes</p></div>
      <table className="tabla-admin">
        <thead>
          <tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id}>
              <td style={{ fontWeight: 600 }}>{o.numeroOrden}</td>
              <td>{o.usuario?.nombre || '-'}</td>
              <td>{new Date(o.fechaOrden).toLocaleDateString()}</td>
              <td style={{ fontWeight: 700 }}>${Number(o.total).toFixed(2)}</td>
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

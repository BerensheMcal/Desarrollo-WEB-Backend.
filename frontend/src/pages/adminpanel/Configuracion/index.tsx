import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { FiSave, FiPercent } from 'react-icons/fi';

export default function AdminConfiguracion() {
  const [descuento, setDescuento] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    adminService.configuracion.listar().then(({ data }) => {
      const conf = data.find((c: any) => c.clave === 'descuento_cliente_frecuente');
      if (conf) setDescuento(conf.valor);
      setCargando(false);
    });
  }, []);

  const guardar = async () => {
    setGuardando(true);
    setMensaje('');
    try {
      await adminService.configuracion.actualizar('descuento_cliente_frecuente', descuento);
      setMensaje('Configuración guardada correctamente');
    } catch {
      setMensaje('Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div className="animacion-fade-in" style={{ maxWidth: 600 }}>
      <div className="admin-header" style={{ marginBottom: '1.5rem' }}>
        <h1>Configuración</h1>
        <p>Gestiona las configuraciones del sistema</p>
      </div>

      <div className="tarjeta" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <FiPercent /> Descuento Cliente Frecuente
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)', margin: 0 }}>
          Porcentaje de descuento aplicado automáticamente a clientes con 10 o más compras completadas.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            type="number"
            min="0"
            max="100"
            placeholder="10"
            style={{ ...inputStyle, width: 120 }}
          />
          <span>%</span>
          <button className="btn btn-primario" onClick={guardar} disabled={guardando} style={{ gap: '0.5rem' }}>
            <FiSave /> {guardando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
        {mensaje && (
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radio)', fontSize: '0.875rem', background: mensaje.includes('Error') ? '#fef2f2' : '#dcfce7', color: mensaje.includes('Error') ? '#991b1b' : '#166534' }}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

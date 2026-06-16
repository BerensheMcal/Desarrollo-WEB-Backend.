import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { RegistroAuditoria } from '../../../types';
import { FiLogIn, FiLogOut, FiAlertCircle } from 'react-icons/fi';
/*TABLA VS PUNTO 11 */
const iconoEvento = { INGRESO_EXITOSO: <FiLogIn color="#22c55e" />, INGRESO_FALLIDO: <FiAlertCircle color="#ef4444" />, CIERRE_SESION: <FiLogOut color="#64748b" /> };
const textoEvento = { INGRESO_EXITOSO: 'Ingreso exitoso', INGRESO_FALLIDO: 'Ingreso fallido', CIERRE_SESION: 'Cierre de sesión' };

export default function AdminAuditoria() {
  const [registros, setRegistros] = useState<RegistroAuditoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    adminService.auditoria.listar().then(({ data }) => { setRegistros(data); setCargando(false); });
  }, []);

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div className="animacion-fade-in">
      <div className="admin-header"><h1>Auditoría</h1><p>Registro de accesos al sistema</p></div>
      <table className="tabla-admin">
        <thead>
          <tr><th>Evento</th><th>Usuario/Email</th><th>Dirección IP</th><th>Navegador</th><th>Fecha y Hora</th></tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r.id}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{iconoEvento[r.evento]} <span style={{ fontSize: '0.8125rem' }}>{textoEvento[r.evento]}</span></td>
              <td>{r.emailIntentado || r.usuarioId || 'Anónimo'}</td>
              <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{r.direccionIp}</td>
              <td style={{ fontSize: '0.75rem', color: 'var(--color-texto-secundario)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.navegador}</td>
              <td style={{ fontSize: '0.8125rem' }}>{new Date(r.fechaHora).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

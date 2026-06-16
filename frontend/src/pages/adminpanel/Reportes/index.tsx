import { useState } from 'react';
import { adminService } from '../../../services/admin.service';
import { FiDownload, FiFileText } from 'react-icons/fi';

/*DESCARGA DE REPORTES AQUI */

export default function AdminReportes() {
  const [descargando, setDescargando] = useState(false);

  const descargarPDF = async () => {
    setDescargando(true);
    try {
      const response = await adminService.reportes.descargarPDF();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-ventas.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="animacion-fade-in">
      <div className="admin-header"><h1>Reportes</h1><p>Generación de reportes del sistema</p></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="tarjeta" style={{ cursor: 'pointer', transition: 'transform var(--transicion)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }} onClick={descargarPDF}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radio)', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiFileText size={28} color="#f59e0b" />
          </div>
          <h3 style={{ fontWeight: 600 }}>Reporte de Ventas</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-texto-secundario)', textAlign: 'center' }}>Productos más vendidos, clientes frecuentes e ingresos por mes</p>
          <button className="btn btn-primario" disabled={descargando}>
            <FiDownload /> {descargando ? 'Descargando...' : 'Descargar PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

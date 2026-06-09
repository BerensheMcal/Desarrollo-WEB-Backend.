import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiPackage, FiGrid, FiUsers, FiShoppingBag,
  FiCalendar, FiFileText, FiBarChart2, FiLogOut, FiChevronLeft,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';


const enlacesAdmin = [
  { ruta: '/adminpanel', icono: FiHome, texto: 'Dashboard', roles: ['ADMIN'] },
  { ruta: '/adminpanel/productos', icono: FiPackage, texto: 'Productos', roles: ['ADMIN'] },
  { ruta: '/adminpanel/categorias', icono: FiGrid, texto: 'Categorías', roles: ['ADMIN'] },
  { ruta: '/adminpanel/clientes', icono: FiUsers, texto: 'Clientes', roles: ['ADMIN', 'STAFF'] },
  { ruta: '/adminpanel/ordenes', icono: FiShoppingBag, texto: 'Órdenes', roles: ['ADMIN'] },
  { ruta: '/adminpanel/talleres', icono: FiCalendar, texto: 'Talleres', roles: ['ADMIN'] },
  { ruta: '/adminpanel/auditoria', icono: FiFileText, texto: 'Auditoría', roles: ['ADMIN'] },
  { ruta: '/adminpanel/reportes', icono: FiBarChart2, texto: 'Reportes', roles: ['ADMIN'] },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cerrarSesion, esAdmin, esStaff } = useAuth();
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  const enlacesVisibles = enlacesAdmin.filter(
    (e) => e.roles.includes('ADMIN') || (esStaff && e.roles.includes('STAFF'))
  );

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarAbierto ? '' : 'cerrado'}`}>
        <div className="admin-sidebar-titulo">Panel de Administración</div>
        {enlacesVisibles.map((enlace) => (
          <Link
            key={enlace.ruta}
            to={enlace.ruta}
            className={`admin-sidebar-enlace ${location.pathname === enlace.ruta ? 'activo' : ''}`}
          >
            <enlace.icono size={18} />
            {enlace.texto}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem 1.25rem' }}>
          <Link to="/" className="admin-sidebar-enlace" style={{ color: 'var(--color-texto-secundario)' }}>
            <FiChevronLeft size={18} />
            Volver a Tienda
          </Link>
        </div>
      </aside>

      <main className="admin-contenido">
        <Outlet />
      </main>
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Landing from './pages/public/Landing';
import Productos from './pages/public/Productos';
import DetalleProducto from './pages/public/DetalleProducto';
import Talleres from './pages/public/Talleres';
import DetalleTaller from './pages/public/DetalleTaller';
import Carrito from './pages/public/Carrito';
import IniciarSesion from './pages/auth/IniciarSesion';
import Registro from './pages/auth/Registro';
import Perfil from './pages/auth/Perfil';
import Categorias from './pages/public/Categorias';
import Dashboard from './pages/adminpanel/Dashboard';
import AdminLayout from './pages/adminpanel/AdminLayout';
import AdminProductos from './pages/adminpanel/Productos';
import AdminCategorias from './pages/adminpanel/Categorias';
import AdminClientes from './pages/adminpanel/Clientes';
import AdminOrdenes from './pages/adminpanel/Ordenes';
import AdminTalleres from './pages/adminpanel/Talleres';
import AdminAuditoria from './pages/adminpanel/Auditoria';
import AdminReportes from './pages/adminpanel/Reportes';
import AdminConfiguracion from './pages/adminpanel/Configuracion';

function AdminProtegido({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth/iniciar-sesion" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/talleres" element={<Talleres />} />
          <Route path="/talleres/:id" element={<DetalleTaller />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/auth/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/auth/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route
            path="/adminpanel"
            element={
              <AdminProtegido>
                <AdminLayout />
              </AdminProtegido>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="categorias" element={<AdminCategorias />} />
            <Route path="clientes" element={<AdminClientes />} />
            <Route path="ordenes" element={<AdminOrdenes />} />
            <Route path="talleres" element={<AdminTalleres />} />
            <Route path="auditoria" element={<AdminAuditoria />} />
            <Route path="reportes" element={<AdminReportes />} />
            <Route path="configuracion" element={<AdminConfiguracion />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

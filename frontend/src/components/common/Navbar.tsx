import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiPackage } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import '../../styles/navbar.css';

/* MI MENU PUBLICO */

export default function Navbar() {
  const { usuario, estaAutenticado, cerrarSesion, esAdmin, esStaff } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlaceActivo = (ruta: string) => location.pathname === ruta ? 'activo' : '';

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  const puedeAccederAdmin = esAdmin || esStaff;

  return (
    <nav className="navbar">
      <div className="navbar-contenido">
        <Link to="/" className="navbar-logo">
          <FiPackage size={24} />
          Tienda Kroxi
        </Link>

        <div className={`navbar-enlaces ${menuAbierto ? 'abierto' : ''}`}>
          <Link to="/productos" className={`navbar-enlace ${enlaceActivo('/productos')}`}>
            Productos
          </Link>
          <Link to="/categorias" className={`navbar-enlace ${enlaceActivo('/categorias')}`}>
            Categorías
          </Link>
          <Link to="/talleres" className={`navbar-enlace ${enlaceActivo('/talleres')}`}>
            Talleres
          </Link>
          {puedeAccederAdmin && (
            <Link to="/adminpanel" className={`navbar-enlace ${enlaceActivo('/adminpanel')}`}>
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-acciones">
          {estaAutenticado ? (
            <>
              <div className="navbar-redes">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="red-icono facebook" title="Facebook"><FaFacebook size={18} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="red-icono instagram" title="Instagram"><FaInstagram size={18} /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="red-icono tiktok" title="TikTok"><FaTiktok size={18} /></a>
                <a href="https://wa.me/541112345678" target="_blank" rel="noopener noreferrer" className="red-icono whatsapp" title="WhatsApp"><FaWhatsapp size={18} /></a>
              </div>
              <div className="navbar-separador" />
              <Link to="/carrito" className="navbar-boton">
                <FiShoppingCart size={20} />
              </Link>
              <Link to="/perfil" className="navbar-boton">
                <FiUser size={20} />
              </Link>
              <button className="navbar-boton" onClick={handleCerrarSesion} title="Cerrar sesión">
                <FiLogOut size={20} />
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-texto-secundario)', fontWeight: 500 }}>
                {usuario?.nombre}
              </span>
            </>
          ) : (
            <div className="navbar-redes">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="red-icono facebook" title="Facebook"><FaFacebook size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="red-icono instagram" title="Instagram"><FaInstagram size={18} /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="red-icono tiktok" title="TikTok"><FaTiktok size={18} /></a>
              <a href="https://wa.me/541112345678" target="_blank" rel="noopener noreferrer" className="red-icono whatsapp" title="WhatsApp"><FaWhatsapp size={18} /></a>
            </div>
          )}
          {!estaAutenticado && (
            <Link to="/auth/iniciar-sesion" className="btn btn-primario btn-sm">
              Iniciar Sesión
            </Link>
          )}
          <button
            className="navbar-boton"
            style={{ display: 'none' }}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

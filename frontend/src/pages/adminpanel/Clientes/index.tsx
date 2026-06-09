import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { FiTrash2, FiPlus, FiX, FiEdit2 } from 'react-icons/fi';

export default function AdminClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [contrasena, setContrasena] = useState('');

  const cargar = async () => {
    const { data } = await adminService.usuarios.listarClientes();
    setClientes(data);
    setCargando(false);
  };

  useEffect(() => { cargar(); }, []);

  const abrirFormCrear = () => {
    setEditando(null);
    setNombre('');
    setEmail('');
    setCelular('');
    setContrasena('');
    setMostrarForm(true);
  };

  const abrirFormEditar = (c: any) => {
    setEditando(c.id);
    setNombre(c.nombre);
    setEmail(c.email);
    setCelular(c.celular || '');
    setContrasena('');
    setMostrarForm(true);
  };

  const guardar = async () => {
    if (!nombre.trim() || !email.trim()) return;
    if (editando) {
      const data: any = { nombre, email, celular: celular || undefined };
      if (contrasena) data.contrasena = contrasena;
      await adminService.usuarios.actualizar(editando, data);
    } else {
      await adminService.usuarios.crear({ nombre, email, celular: celular || undefined, contrasena: contrasena || 'ClienteTemp2024$', rol: 'CLIENTE' });
    }
    setNombre('');
    setEmail('');
    setCelular('');
    setContrasena('');
    setEditando(null);
    setMostrarForm(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (confirm('¿Eliminar cliente?')) {
      await adminService.usuarios.eliminar(id);
      cargar();
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div className="animacion-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Clientes</h1><p>Gestión de clientes registrados</p></div>
        <button className="btn btn-primario" onClick={abrirFormCrear}><FiPlus /> Agregar Cliente</button>
      </div>

      {mostrarForm && (
        <div className="tarjeta" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{editando ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
            <button className="btn btn-outline btn-sm" onClick={() => { setMostrarForm(false); setEditando(null); }}><FiX /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" style={inputStyle} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" style={inputStyle} />
            <input value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="Celular" type="tel" style={inputStyle} />
            <input value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder={editando ? 'Nueva contraseña (opcional)' : 'Contraseña'} type="password" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => { setMostrarForm(false); setEditando(null); }}>Cancelar</button>
            <button className="btn btn-primario" onClick={guardar} disabled={!nombre.trim() || !email.trim()}>{editando ? 'Actualizar' : 'Crear Cliente'}</button>
          </div>
        </div>
      )}

      <table className="tabla-admin">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Celular</th><th>Registro</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td style={{ fontWeight: 600 }}>{c.nombre}</td>
              <td>{c.email}</td>
              <td>{c.celular || '-'}</td>
              <td>{new Date(c.fechaCreacion).toLocaleDateString()}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => abrirFormEditar(c)}><FiEdit2 size={14} /></button>
                  <button className="btn btn-peligro btn-sm" onClick={() => eliminar(c.id)}><FiTrash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
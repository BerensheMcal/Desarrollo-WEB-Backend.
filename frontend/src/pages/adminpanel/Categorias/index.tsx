import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { Categoria } from '../../../types';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const cargar = async () => {
    const { data } = await adminService.categorias.listar();
    setCategorias(data);
    setCargando(false);
  };

  useEffect(() => { cargar(); }, []);

  const abrirFormCrear = () => {
    setEditando(null);
    setNombre('');
    setDescripcion('');
    setMostrarForm(true);
  };

  const abrirFormEditar = (c: Categoria) => {
    setEditando(c.id);
    setNombre(c.nombre);
    setDescripcion(c.descripcion || '');
    setMostrarForm(true);
  };

  const guardar = async () => {
    if (!nombre.trim()) return;
    if (editando) {
      await adminService.categorias.actualizar(editando, { nombre, descripcion: descripcion || undefined });
    } else {
      await adminService.categorias.crear({ nombre, descripcion: descripcion || undefined });
    }
    setNombre('');
    setDescripcion('');
    setEditando(null);
    setMostrarForm(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (confirm('¿Eliminar categoría?')) {
      await adminService.categorias.eliminar(id);
      cargar();
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  return (
    <div className="animacion-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Categorías</h1><p>Gestión de categorías de productos</p></div>
        <button className="btn btn-primario" onClick={abrirFormCrear}><FiPlus /> Nueva Categoría</button>
      </div>

      {mostrarForm && (
        <div className="tarjeta" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de categoría" style={{ flex: 1, minWidth: 200, padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)' }} />
          <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" style={{ flex: 2, minWidth: 300, padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primario" onClick={guardar}>{editando ? 'Actualizar' : 'Agregar'}</button>
            <button className="btn btn-outline" onClick={() => { setMostrarForm(false); setNombre(''); setDescripcion(''); setEditando(null); }}><FiX /></button>
          </div>
        </div>
      )}

      <table className="tabla-admin">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td style={{ fontWeight: 600 }}>{c.nombre}</td>
              <td style={{ color: 'var(--color-texto-secundario)' }}>{c.descripcion || '-'}</td>
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
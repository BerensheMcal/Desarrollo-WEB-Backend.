import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { Producto, Categoria } from '../../../types';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { getImagenUrl } from '../../../utils/imageUrl';

export default function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const cargar = async () => {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      adminService.productos.listar(),
      adminService.categorias.listar(),
    ]);
    setProductos(prods);
    setCategorias(cats);
    setCargando(false);
  };

  useEffect(() => { cargar(); }, []);

  const abrirFormCrear = () => {
    setEditando(null);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setCategoriaId('');
    setImagenFile(null);
    setImagenPreview(null);
    setMostrarForm(true);
  };

  const abrirFormEditar = (p: Producto) => {
    setEditando(p.id);
    setNombre(p.nombre);
    setDescripcion(p.descripcion || '');
    setPrecio(String(Number(p.precio)));
    setStock(String(p.stock));
    setCategoriaId(String(p.categoriaId || ''));
    setImagenFile(null);
    setImagenPreview(getImagenUrl(p.imagenPrincipalUrl));
    setMostrarForm(true);
  };

  const handleImagenCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const guardar = async () => {
    if (!nombre.trim() || !precio || stock === '') return;
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('stock', stock);
    if (categoriaId) formData.append('categoriaId', categoriaId);
    if (imagenFile) formData.append('imagen', imagenFile);

    if (editando) {
      if (imagenFile) {
        const formDataPatch = new FormData();
        formDataPatch.append('nombre', nombre);
        formDataPatch.append('descripcion', descripcion);
        formDataPatch.append('precio', precio);
        formDataPatch.append('stock', stock);
        if (categoriaId) formDataPatch.append('categoriaId', categoriaId);
        formDataPatch.append('imagen', imagenFile);
        await adminService.productos.actualizar(editando, formDataPatch);
      } else {
        await adminService.productos.actualizar(editando, { nombre, descripcion, precio: Number(precio), stock: Number(stock), categoriaId: categoriaId ? Number(categoriaId) : undefined });
      }
    } else {
      await adminService.productos.crear(formData);
    }
    setMostrarForm(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (confirm('¿Eliminar producto?')) {
      await adminService.productos.eliminar(id);
      cargar();
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div className="animacion-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Productos</h1><p>Gestión de productos del catálogo</p></div>
        <button className="btn btn-primario" onClick={abrirFormCrear}><FiPlus /> Nuevo Producto</button>
      </div>

      {mostrarForm && (
        <div className="tarjeta" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <button className="btn btn-outline btn-sm" onClick={() => setMostrarForm(false)}><FiX /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" style={inputStyle} />
            <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} style={inputStyle}>
              <option value="">Sin categoría</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" placeholder="Precio" min="0" step="0.01" style={inputStyle} />
            <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" placeholder="Stock" min="0" style={inputStyle} />
            <div style={{ gridColumn: '1 / -1' }}>
              <input type="file" accept="image/*" onChange={handleImagenCambio} style={{ fontSize: '0.875rem' }} />
              {imagenPreview && <img src={imagenPreview} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--radio)', marginTop: '0.5rem' }} />}
            </div>
          </div>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => setMostrarForm(false)}>Cancelar</button>
            <button className="btn btn-primario" onClick={guardar}>{editando ? 'Actualizar' : 'Crear Producto'}</button>
          </div>
        </div>
      )}

      <table className="tabla-admin">
        <thead>
          <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={getImagenUrl(p.imagenPrincipalUrl) || 'https://via.placeholder.com/40'} alt="" style={{ width: 40, height: 40, borderRadius: 'var(--radio)', objectFit: 'cover' }} />
              </td>
              <td style={{ fontWeight: 600 }}>{p.nombre}</td>
              <td>{p.categoria?.nombre || '-'}</td>
              <td>Bs{Number(p.precio).toFixed(2)}</td>
              <td><span className={`badge ${p.stock > 0 ? 'badge-exito' : 'badge-peligro'}`}>{p.stock}</span></td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline btn-sm" onClick={() => abrirFormEditar(p)}><FiEdit2 size={14} /></button>
                  <button className="btn btn-peligro btn-sm" onClick={() => eliminar(p.id)}><FiTrash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
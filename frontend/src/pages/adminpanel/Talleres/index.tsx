import { useState, useEffect, useRef } from 'react';
import { adminService } from '../../../services/admin.service';
import { Taller } from '../../../types';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiImage } from 'react-icons/fi';

export default function AdminTalleres() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cuposMaximos, setCuposMaximos] = useState('');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const inputImagenRef = useRef<HTMLInputElement>(null);

  const cargar = async () => {
    const { data } = await adminService.talleres.listar();
    setTalleres(data);
    setCargando(false);
  };

  useEffect(() => { cargar(); }, []);

  const abrirFormCrear = () => {
    setEditando(null);
    setNombre('');
    setDescripcion('');
    setFechaInicio('');
    setFechaFin('');
    setHoraInicio('');
    setHoraFin('');
    setCuposMaximos('');
    setPrecio('');
    setUbicacion('');
    setImagenPreview(null);
    setImagenArchivo(null);
    setMostrarForm(true);
  };

  const abrirFormEditar = (t: Taller) => {
    setEditando(t.id);
    setNombre(t.nombre);
    setDescripcion(t.descripcion || '');
    setFechaInicio((t.fechaInicio+'').split('T')[0]);
    setFechaFin((t.fechaFin+'').split('T')[0]);
    setHoraInicio(t.horaInicio || '');
    setHoraFin(t.horaFin || '');
    setCuposMaximos(String(t.cuposMaximos));
    setPrecio(String(t.precio));
    setUbicacion(t.ubicacion || '');
    setImagenPreview(t.imagenUrl ? `http://localhost:3000${t.imagenUrl}` : null);
    setImagenArchivo(null);
    setMostrarForm(true);
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenArchivo(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const guardar = async () => {
    if (!nombre.trim() || !fechaInicio || !fechaFin || !cuposMaximos || !precio) return;
    const usarFormData = imagenArchivo || (editando && imagenArchivo);
    let data: any;
    if (usarFormData) {
      data = new FormData();
      data.append('nombre', nombre);
      data.append('descripcion', descripcion || '');
      data.append('fechaInicio', fechaInicio);
      data.append('fechaFin', fechaFin);
      data.append('horaInicio', horaInicio || '');
      data.append('horaFin', horaFin || '');
      data.append('cuposMaximos', cuposMaximos);
      data.append('cuposDisponibles', cuposMaximos);
      data.append('precio', precio);
      data.append('ubicacion', ubicacion || '');
      if (imagenArchivo) data.append('imagen', imagenArchivo);
    } else {
      data = {
        nombre,
        descripcion: descripcion || undefined,
        fechaInicio,
        fechaFin,
        horaInicio: horaInicio || undefined,
        horaFin: horaFin || undefined,
        cuposMaximos: Number(cuposMaximos),
        cuposDisponibles: Number(cuposMaximos),
        precio: Number(precio),
        ubicacion: ubicacion || undefined,
      };
    }
    if (editando) {
      await adminService.talleres.actualizar(editando, data);
    } else {
      await adminService.talleres.crear(data);
    }
    setMostrarForm(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (confirm('¿Eliminar taller?')) {
      await adminService.talleres.eliminar(id);
      cargar();
    }
  };

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner spinner-lg" /></div>;

  const inputStyle = { padding: '0.5rem 0.75rem', border: '1.5px solid var(--color-borde)', borderRadius: 'var(--radio)', width: '100%' };

  return (
    <div className="animacion-fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h1>Talleres</h1><p>Gestión de talleres de pintura</p></div>
        <button className="btn btn-primario" onClick={abrirFormCrear}><FiPlus /> Nuevo Taller</button>
      </div>

      {mostrarForm && (
        <div className="tarjeta" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{editando ? 'Editar Taller' : 'Nuevo Taller'}</h3>
            <button className="btn btn-outline btn-sm" onClick={() => setMostrarForm(false)}><FiX /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del taller" style={inputStyle} />
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación" style={inputStyle} />
            <input value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} type="date" style={inputStyle} />
            <input value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} type="date" style={inputStyle} />
            <input value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} type="time" placeholder="Hora inicio" style={inputStyle} />
            <input value={horaFin} onChange={(e) => setHoraFin(e.target.value)} type="time" placeholder="Hora fin" style={inputStyle} />
            <input value={cuposMaximos} onChange={(e) => setCuposMaximos(e.target.value)} type="number" placeholder="Cupos máximos" min="1" style={inputStyle} />
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" placeholder="Precio" min="0" step="0.01" style={inputStyle} />
          </div>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del taller" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Imagen del taller</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => inputImagenRef.current?.click()}><FiImage /> Seleccionar imagen</button>
              <input ref={inputImagenRef} type="file" accept="image/*" onChange={handleImagenChange} style={{ display: 'none' }} />
              {imagenPreview && (
                <img src={imagenPreview} alt="Preview" style={{ width: 80, height: 80, borderRadius: 'var(--radio)', objectFit: 'cover' }} />
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => setMostrarForm(false)}>Cancelar</button>
            <button className="btn btn-primario" onClick={guardar}>{editando ? 'Actualizar' : 'Crear Taller'}</button>
          </div>
        </div>
      )}

      <table className="tabla-admin">
        <thead>
          <tr><th>Imagen</th><th>Nombre</th><th>Fecha</th><th>Cupos</th><th>Precio</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {talleres.map((t) => (
            <tr key={t.id}>
              <td>
                {t.imagenUrl ? (
                  <img src={`http://localhost:3000${t.imagenUrl}`} alt="" style={{ width: 48, height: 48, borderRadius: 'var(--radio)', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radio)', background: 'var(--color-fondo)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-texto-secundario)', fontSize: '0.75rem' }}><FiImage /></div>
                )}
              </td>
              <td style={{ fontWeight: 600 }}>{t.nombre}</td>
              <td>{(t.fechaInicio+'').split('T')[0]} - {(t.fechaFin+'').split('T')[0]}</td>
              <td><span className={`badge ${t.cuposDisponibles > 0 ? 'badge-exito' : 'badge-peligro'}`}>{t.cuposDisponibles}/{t.cuposMaximos}</span></td>
              <td>Bs{Number(t.precio).toFixed(2)}</td>
              <td><div style={{ display: 'flex', gap: '0.5rem' }}><button className="btn btn-outline btn-sm" onClick={() => abrirFormEditar(t)}><FiEdit2 size={14} /></button><button className="btn btn-peligro btn-sm" onClick={() => eliminar(t.id)}><FiTrash2 size={14} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
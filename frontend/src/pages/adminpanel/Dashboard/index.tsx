import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service';
import { DatosDashboard } from '../../../types';
import { FiDollarSign, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../../../styles/admin.css';

/*GRAFICO ESTADISTICO  */

const COLORS = ['#6366f1', '#f59e0b', '#22c55e', '#ef4444', '#3b82f6', '#8b5cf6'];

export default function Dashboard() {
  const [datos, setDatos] = useState<DatosDashboard | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    adminService.dashboard().then(({ data }) => {
      setDatos(data);
      setCargando(false);
    });
  }, []);

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner spinner-lg" />
      </div>
    );
  }

  const totalIngresos = datos?.ingresosPorMes?.reduce((sum, m) => sum + Number(m.ingresos), 0) || 0;
  const totalOrdenes = datos?.ingresosPorMes?.reduce((sum, m) => sum + Number(m.total_ordenes), 0) || 0;
  const totalClientesFrecuentes = datos?.clientesFrecuentes?.length || 0;
  const totalProductosVendidos = datos?.productosMasVendidos?.reduce((sum, p) => sum + Number(p.total_vendido), 0) || 0;

  return (
    <div className="animacion-fade-in">
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p>Resumen general de la tienda</p>
      </div>

      <div className="dashboard-tarjetas">
        <div className="dashboard-tarjeta">
          <div className="dashboard-tarjeta-icono" style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <FiDollarSign size={24} />
          </div>
          <div className="dashboard-tarjeta-info">
            <h3>${totalIngresos.toFixed(2)}</h3>
            <p>Ingresos Totales</p>
          </div>
        </div>
        <div className="dashboard-tarjeta">
          <div className="dashboard-tarjeta-icono" style={{ background: '#dcfce7', color: '#22c55e' }}>
            <FiShoppingCart size={24} />
          </div>
          <div className="dashboard-tarjeta-info">
            <h3>{totalOrdenes}</h3>
            <p>Órdenes Totales</p>
          </div>
        </div>
        <div className="dashboard-tarjeta">
          <div className="dashboard-tarjeta-icono" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <FiUsers size={24} />
          </div>
          <div className="dashboard-tarjeta-info">
            <h3>{totalClientesFrecuentes}</h3>
            <p>Clientes Frecuentes</p>
          </div>
        </div>
        <div className="dashboard-tarjeta">
          <div className="dashboard-tarjeta-icono" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
            <FiPackage size={24} />
          </div>
          <div className="dashboard-tarjeta-info">
            <h3>{totalProductosVendidos}</h3>
            <p>Productos Vendidos</p>
          </div>
        </div>
      </div>
      
      {/* GRAFICO DE BARRAS */}

      <div className="dashboard-graficos">
        <div className="dashboard-grafico animacion-slide-up">
          <h3>Ingresos por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datos?.ingresosPorMes?.reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GRAFICO DE PASTEL  */}
        
        <div className="dashboard-grafico animacion-slide-up">
          <h3>Productos Más Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datos?.productosMasVendidos?.slice(0, 6).map((p) => ({
                  name: p.nombre,
                  value: Number(p.total_vendido),
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }: { percent?: number }) => {
                  const pct = typeof percent === 'number' ? Math.round(percent * 100) : 0;
                  return `${pct}%`;
                }}
                outerRadius={100}
                dataKey="value"
              >
                {datos?.productosMasVendidos?.slice(0, 6).map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

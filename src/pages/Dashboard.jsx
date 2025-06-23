import { useState } from 'react';
import Toast from '../components/Toast';

export default function Dashboard() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const enviarSolicitud = (empresa) => {
    setToastMessage(`✅ Solicitud enviada a ${empresa}`);
    setToastVisible(true);
  };

  const empresas = [
    {
      nombre: 'AgroFuturo S.A.S',
      descripcion: 'Distribución agrícola B2B para el Caribe colombiano.',
      sector: 'Agroindustria',
      ubicacion: 'Cartagena, Bolívar',
      correo: 'contacto@agrofuturo.com',
      conexiones: 'Alta actividad'
    },
    {
      nombre: 'EcoSoluciones Ltda',
      descripcion: 'Tecnología verde para empresas sostenibles.',
      sector: 'Tecnología Ambiental',
      ubicacion: 'Medellín, Antioquia',
      correo: 'info@ecosoluciones.co',
      conexiones: 'Conexión media'
    },
    {
      nombre: 'Logística Express',
      descripcion: 'Aliados en transporte empresarial y distribución regional.',
      sector: 'Logística y Transporte',
      ubicacion: 'Barranquilla, Atlántico',
      correo: 'logistica@express.com',
      conexiones: 'Alta actividad'
    },
    {
      nombre: 'ConectaTech',
      descripcion: 'Consultoría en transformación digital para PYMES.',
      sector: 'Consultoría IT',
      ubicacion: 'Bogotá D.C.',
      correo: 'contacto@conectatech.co',
      conexiones: 'Nueva en la red'
    }
  ];

  // 🔍 Filtro dinámico
  const empresasFiltradas = empresas.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={dashboardWrapper}>
      {toastVisible && (
        <Toast mensaje={toastMessage} onClose={() => setToastVisible(false)} />
      )}

      {/* 🔍 Barra de búsqueda arriba del título */}
      <div style={buscadorContainer}>
        <input
          type="text"
          placeholder="Buscar empresa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={inputBusqueda}
        />
      </div>

      <h1 style={titulo}>Empresas que te podrían interesar</h1>

      <div style={listaEmpresas}>
        {empresasFiltradas.map((empresa, i) => (
          <div key={i} style={cardEmpresa}>
            <h2 style={empresaNombre}>{empresa.nombre}</h2>
            <p style={descripcion}>{empresa.descripcion}</p>
            <p><strong>📌 Sector:</strong> {empresa.sector}</p>
            <p><strong>🌍 Ubicación:</strong> {empresa.ubicacion}</p>
            <p><strong>📧 Contacto:</strong> {empresa.correo}</p>
            <p><strong>📈 Estado:</strong> {empresa.conexiones}</p>
            <button
              style={btnConectar}
              onClick={() => enviarSolicitud(empresa.nombre)}
            >
              🤝 Conectar
            </button>
          </div>
        ))}

        {empresasFiltradas.length === 0 && (
          <p style={{ color: '#007bff', textAlign: 'center', marginTop: '2rem' }}>
            😕 No se encontraron empresas con ese nombre.
          </p>
        )}
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const dashboardWrapper = {
  padding: '2rem',
  fontFamily: 'Poppins, sans-serif'
};

const buscadorContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem'
};

const inputBusqueda = {
  padding: '0.75rem 1.25rem',
  borderRadius: '30px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '400px',
  fontSize: '1rem'
};

const titulo = {
  fontSize: '1.8rem',
  marginBottom: '2rem',
  color: '#007bff',
  textAlign: 'center'
};

const listaEmpresas = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const cardEmpresa = {
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const empresaNombre = {
  fontSize: '1.3rem',
  color: '#007bff',
  marginBottom: '0.5rem'
};

const descripcion = {
  fontSize: '1rem',
  color: '#555',
  marginBottom: '0.5rem'
};

const btnConectar = {
  alignSelf: 'flex-start',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '1rem'
};

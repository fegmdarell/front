import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={landingWrapper}>
      <h1 style={titulo}>🌐 Conecta Empresas</h1>
      <p style={subtitulo}>
        Conecta empresas, crea alianzas y haz crecer tu red de negocios en Colombia.
      </p>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Empresas conectadas"
        style={imagen}
      />
      <div style={botones}>
        <button style={btnPrimario} onClick={() => navigate('/login')}>
          Iniciar Sesión
        </button>
        <button style={btnSecundario} onClick={() => navigate('/registro')}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const landingWrapper = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #fff 100%)',
  padding: '2rem'
};

const titulo = {
  fontSize: '2.5rem',
  color: '#007bff',
  marginBottom: '1rem',
  fontWeight: 700,
  textAlign: 'center'
};

const subtitulo = {
  fontSize: '1.2rem',
  color: '#333',
  marginBottom: '2rem',
  textAlign: 'center',
  maxWidth: '500px'
};

const imagen = {
  width: '320px',
  borderRadius: '16px',
  marginBottom: '2rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.10)'
};

const botones = {
  display: 'flex',
  gap: '1.5rem'
};

const btnPrimario = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '0.9rem 2rem',
  fontSize: '1.1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 600
};

const btnSecundario = {
  backgroundColor: '#fff',
  color: '#007bff',
  border: '2px solid #007bff',
  padding: '0.9rem 2rem',
  fontSize: '1.1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 600
};
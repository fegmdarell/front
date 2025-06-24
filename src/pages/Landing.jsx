import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={landingWrapper}>
      <img src={logo} alt="Logo Conecta" style={logoStyle} />
    
      <p style={subtitulo}>
         Tu puente digital para crecer en red.
      </p>
      <div style={botones}>
        <button style={btnPrimario} onClick={() => navigate('/login')}>
          Iniciar Sesión
        </button>
        <button style={btnSecundario} onClick={() => navigate('/registro')}>
          Registrarse
        </button>
      </div>
      <p style={{ marginTop: '2rem', color: '#e0e7ff', fontSize: '0.95rem' }}>
        <button style={{ background: 'none', border: 'none', color: '#00fff7', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/politica-datos')}>
          Política de protección de datos
        </button>
      </p>
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
  background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)', // Fondo degradado azul oscuro
  padding: '2rem'
};

const logoStyle = {
  width: '400px', // o el tamaño que prefieras
  marginBottom: '2rem'
};



const subtitulo = {
  fontSize: '1.2rem',
  color: '#e0e7ff',
  marginBottom: '2rem',
  textAlign: 'center',
  maxWidth: '500px'
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
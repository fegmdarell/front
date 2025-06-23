import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Limpiar cualquier sesión anterior
  useEffect(() => {
    sessionStorage.removeItem('usuario');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/empresa/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }

      // ✅ Guardar usuario y navegar al dashboard
      sessionStorage.setItem('usuario', JSON.stringify(data.empresa));
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={input}
            type="email"
            placeholder="Correo"
            onChange={e => setForm({ ...form, correo: e.target.value })}
            required
          />
          <input
            style={input}
            type="password"
            placeholder="Contraseña"
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p style={errorText}>{error}</p>}
          <button style={button} type="submit">Entrar</button>
        </form>
        <p style={text}>
          ¿No tienes cuenta?
          <button onClick={() => navigate('/registro')} style={linkButton}>
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}

// ESTILOS
const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f4',
};

const card = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
};

const title = {
  textAlign: 'center',
  marginBottom: '1rem',
  color: '#007bff',
};

const input = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const button = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '0.75rem',
  width: '100%',
  fontSize: '1rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorText = {
  color: 'red',
  marginBottom: '1rem',
  textAlign: 'center',
};

const text = {
  textAlign: 'center',
  marginTop: '1rem',
};

const linkButton = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  fontSize: '1rem',
  marginLeft: '0.25rem',
  cursor: 'pointer',
  textDecoration: 'underline',
};

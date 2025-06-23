import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', correo: '', password: '' });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await fetch('https://backk-fugf.onrender.com/api/empresa/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error((await res.json()).message);

      setMensaje('✅ Registro exitoso. Serás redirigido al login...');
      setTimeout(() => navigate('/'), 2000); // Redirige en 2 segundos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Registro de Empresa</h2>
        <form onSubmit={handleSubmit}>
          <input style={input} placeholder="Nombre" onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <input style={input} type="email" placeholder="Correo" onChange={e => setForm({ ...form, correo: e.target.value })} required />
          <input style={input} type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} required />

          {error && <p style={errorText}>{error}</p>}
          {mensaje && <p style={successText}>{mensaje}</p>}

          <button style={button} type="submit">Crear cuenta</button>
        </form>
        <p style={text}>
          ¿Ya tienes cuenta?
          <button onClick={() => navigate('/login')} style={linkButton}>
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}

// Estilos
const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to bottom right, #1e3c72, #2a5298)',
};

const card = {
  background: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  width: '100%',
  maxWidth: '400px',
};

const title = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#007bff',
};

const input = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const button = {
  width: '100%',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '6px',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
};

const linkButton = {
  marginLeft: '0.5rem',
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const errorText = {
  color: 'red',
  marginBottom: '1rem',
  textAlign: 'center',
};

const successText = {
  color: 'green',
  marginBottom: '1rem',
  textAlign: 'center',
};

const text = {
  textAlign: 'center',
  marginTop: '1rem',
};

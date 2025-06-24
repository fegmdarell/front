import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    nit: '',
    correo: '',
    password: '',
    telefono: '',
    ciudad: '',
    departamento: '',
    direccion: '',
    sector: '',
    tamano: '',
    intereses: '',
    contacto: ''
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Handler para los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
          <input style={inputStyle} name="nombre" placeholder="Nombre de la empresa" value={form.nombre} onChange={handleChange} required />
          <input style={inputStyle} name="nit" placeholder="NIT" value={form.nit} onChange={handleChange} required />
          <input style={inputStyle} name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required />
          <input style={inputStyle} name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <input style={inputStyle} name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
          <input style={inputStyle} name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
          <input style={inputStyle} name="departamento" placeholder="Departamento" value={form.departamento} onChange={handleChange} required />
          <input style={inputStyle} name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
          <input style={inputStyle} name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} required />
          <select style={inputStyle} name="tamano" value={form.tamano} onChange={handleChange} required>
            <option value="">Tamaño de empresa</option>
            <option value="pequeña">Pequeña</option>
            <option value="mediana">Mediana</option>
            <option value="grande">Grande</option>
          </select>
          <input style={inputStyle} name="intereses" placeholder="Intereses" value={form.intereses} onChange={handleChange} />
          <input style={inputStyle} name="contacto" placeholder="Persona de contacto" value={form.contacto} onChange={handleChange} required />

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
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f4f4f4 100%)', // Igual que otras páginas
};

const card = {
  background: '#fff',
  padding: '2.5rem 2rem',
  borderRadius: '18px',
  boxShadow: '0 4px 24px #0002',
  width: '100%',
  maxWidth: '420px',
};

const title = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#007bff',
  fontWeight: 700,
  fontSize: '2rem'
};

const button = {
  width: '100%',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '8px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '1rem'
};

const linkButton = {
  marginLeft: '0.5rem',
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontSize: '1rem'
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
  marginTop: '1rem'
};

// Puedes mejorar los inputs agregando este estilo:
const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  margin: '0.5rem 0',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box'
};
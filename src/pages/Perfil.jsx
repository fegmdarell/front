import { useState, useEffect } from 'react';

export default function Perfil() {
  const [empresa, setEmpresa] = useState({
    nombre: '',
    correo: '',
    descripcion: '',
    sector: '',
    ubicacion: '',
    telefono: '',
    logo: '', // URL del logo si tienes
  });
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario._id) {
      fetch(`https://backk-fugf.onrender.com/api/empresa/${usuario._id}`)
        .then(res => res.json())
        .then(data => setEmpresa(data))
        .catch(() => setMensaje('No se pudo cargar el perfil.'));
    }
  }, []);

  const handleChange = e => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    setMensaje('');
    try {
      const res = await fetch(`https://backk-fugf.onrender.com/api/empresa/${empresa._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empresa),
      });
      if (!res.ok) throw new Error('Error al guardar');
      const actualizado = await res.json();
      setEmpresa(actualizado);
      sessionStorage.setItem('usuario', JSON.stringify(actualizado));
      setEditando(false);
      setMensaje('Perfil actualizado correctamente');
    } catch {
      setMensaje('Error al guardar los cambios');
    }
  };

  return (
    <div style={perfilBg}>
      <div style={perfilCard}>
        <div style={fotoWrapper}>
          <img
            src={empresa.logo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(empresa.nombre)}
            alt="Logo"
            style={fotoPerfil}
          />
        </div>
        <h2 style={nombrePerfil}>{empresa.nombre}</h2>
        <p style={correoPerfil}>{empresa.correo}</p>
        {mensaje && <p style={{ color: mensaje.includes('Error') ? 'red' : 'green' }}>{mensaje}</p>}
        <div style={infoGrid}>
          <div style={infoItem}>
            <b>Descripción:</b><br />
            {editando ? (
              <textarea style={input} name="descripcion" value={empresa.descripcion} onChange={handleChange} />
            ) : (
              <span>{empresa.descripcion}</span>
            )}
          </div>
          <div style={infoItem}>
            <b>Sector:</b><br />
            {editando ? (
              <input style={input} name="sector" value={empresa.sector} onChange={handleChange} />
            ) : (
              <span>{empresa.sector}</span>
            )}
          </div>
          <div style={infoItem}>
            <b>Ubicación:</b><br />
            {editando ? (
              <input style={input} name="ubicacion" value={empresa.ubicacion} onChange={handleChange} />
            ) : (
              <span>{empresa.ubicacion}</span>
            )}
          </div>
          <div style={infoItem}>
            <b>Teléfono:</b><br />
            {editando ? (
              <input style={input} name="telefono" value={empresa.telefono} onChange={handleChange} />
            ) : (
              <span>{empresa.telefono}</span>
            )}
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          {editando ? (
            <button style={btnGuardar} onClick={handleGuardar}>Guardar</button>
          ) : (
            <button style={btnEditar} onClick={() => setEditando(true)}>Editar Perfil</button>
          )}
        </div>
      </div>
    </div>
  );
}

// Estilos tipo Facebook
const perfilBg = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f4f4f4 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const perfilCard = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 24px #0002',
  padding: '2.5rem 2rem',
  maxWidth: 500,
  width: '100%',
  textAlign: 'center'
};
const fotoWrapper = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 16
};
const fotoPerfil = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #007bff',
  background: '#f4f4f4'
};
const nombrePerfil = { fontSize: '2rem', color: '#007bff', margin: '0.5rem 0 0.2rem 0' };
const correoPerfil = { color: '#555', marginBottom: 24 };
const infoGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 };
const infoItem = { background: '#f4f8ff', borderRadius: 8, padding: 12, minHeight: 60, textAlign: 'left', fontSize: '1rem' };
const input = { width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' };
const btnEditar = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.7rem 2rem',
  fontWeight: 600,
  cursor: 'pointer'
};
const btnGuardar = {
  background: '#22c55e',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.7rem 2rem',
  fontWeight: 600,
  cursor: 'pointer'
};

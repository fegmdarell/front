import { useState, useEffect } from 'react';

export default function Perfil() {
  const [empresa, setEmpresa] = useState({
    nombre: '',
    correo: '',
    descripcion: '',
    sector: '',
    ubicacion: '',
    telefono: '',
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
    <div style={perfilWrapper}>
      <h2 style={titulo}>Perfil de la Empresa</h2>
      {mensaje && <p style={{ color: mensaje.includes('Error') ? 'red' : 'green' }}>{mensaje}</p>}
      <div style={infoBox}>
        <label style={label}>Nombre:</label>
        {editando ? (
          <input style={input} name="nombre" value={empresa.nombre} onChange={handleChange} />
        ) : (
          <span>{empresa.nombre}</span>
        )}
      </div>
      <div style={infoBox}>
        <label style={label}>Correo:</label>
        {editando ? (
          <input style={input} name="correo" value={empresa.correo} onChange={handleChange} />
        ) : (
          <span>{empresa.correo}</span>
        )}
      </div>
      <div style={infoBox}>
        <label style={label}>Descripción:</label>
        {editando ? (
          <textarea style={input} name="descripcion" value={empresa.descripcion} onChange={handleChange} />
        ) : (
          <span>{empresa.descripcion}</span>
        )}
      </div>
      <div style={infoBox}>
        <label style={label}>Sector:</label>
        {editando ? (
          <input style={input} name="sector" value={empresa.sector} onChange={handleChange} />
        ) : (
          <span>{empresa.sector}</span>
        )}
      </div>
      <div style={infoBox}>
        <label style={label}>Ubicación:</label>
        {editando ? (
          <input style={input} name="ubicacion" value={empresa.ubicacion} onChange={handleChange} />
        ) : (
          <span>{empresa.ubicacion}</span>
        )}
      </div>
      <div style={infoBox}>
        <label style={label}>Teléfono:</label>
        {editando ? (
          <input style={input} name="telefono" value={empresa.telefono} onChange={handleChange} />
        ) : (
          <span>{empresa.telefono}</span>
        )}
      </div>
      <div style={{ marginTop: 24 }}>
        {editando ? (
          <button style={btnGuardar} onClick={handleGuardar}>Guardar</button>
        ) : (
          <button style={btnEditar} onClick={() => setEditando(true)}>Editar Perfil</button>
        )}
      </div>
    </div>
  );
}

// Estilos
const perfilWrapper = {
  maxWidth: 500,
  margin: '2rem auto',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 16px #0001',
  padding: '2rem',
  textAlign: 'left'
};
const titulo = { textAlign: 'center', color: '#007bff', marginBottom: 24 };
const infoBox = { marginBottom: 16, display: 'flex', flexDirection: 'column' };
const label = { fontWeight: 600, marginBottom: 4 };
const input = { padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' };
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

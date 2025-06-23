export default function Perfil() {
  const empresa = JSON.parse(localStorage.getItem('usuario')) || {}

  return (
    <div style={card}>
      <h1 style={title}>Perfil de la empresa</h1>
      <p><strong>Nombre:</strong> {empresa.nombre || 'No definido'}</p>
      <p><strong>Correo:</strong> {empresa.correo || 'No definido'}</p>
      <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#888' }}>
        (Funcionalidad de edición próximamente)
      </p>
    </div>
  )
}

const card = {
  backgroundColor: 'white',
  padding: '2rem',
  margin: '2rem auto',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: '500px',
  fontFamily: 'Poppins, sans-serif'
}

const title = {
  marginBottom: '1rem',
  textAlign: 'center',
  color: '#007bff'
}

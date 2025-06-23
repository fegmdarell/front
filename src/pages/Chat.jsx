export default function Chat() {
  return (
    <div style={card}>
      <h1 style={title}>Chat empresarial</h1>
      <p>Esta sección permitirá chatear con otras empresas registradas.</p>
      <p style={{ fontStyle: 'italic', color: '#666' }}>
        (Funcionalidad en desarrollo)
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

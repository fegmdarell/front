export default function Ayuda() {
  return (
    <div style={card}>
      <h1 style={title}>Centro de ayuda</h1>
      <ul>
        <li>📩 ¿Cómo contacto a otra empresa?</li>
        <li>💳 ¿Cómo cambio mi plan?</li>
        <li>🔐 ¿Cómo restablezco mi contraseña?</li>
      </ul>
      <p style={{ fontStyle: 'italic', color: '#666', marginTop: '1rem' }}>
        Pronto podrás enviar solicitudes de soporte en línea.
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

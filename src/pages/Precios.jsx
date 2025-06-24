import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const planes = [
  { nombre: 'Básico', descripcion: 'Ideal para pequeños negocios.', precio: 0 },
  { nombre: 'Empresarial', descripcion: 'Para empresas en crecimiento.', precio: 59 },
  { nombre: 'Premium', descripcion: 'Conecta ilimitadamente.', precio: 89 }
]

export default function Precios() {
  const navigate = useNavigate()

  useEffect(() => {
    planes.forEach((plan) => {
      const containerId = `paypal-button-container-${plan.nombre}`
      const container = document.getElementById(containerId)

      if (plan.precio > 0 && container && container.children.length === 0 && window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: `Plan ${plan.nombre} - Conecta`,
                amount: {
                  currency_code: "USD",
                  value: plan.precio
                }
              }]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            alert(`✅ Pago completado para el plan ${plan.nombre}`)
            console.log("🧾 Detalles de la orden:", order)

            const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
            await fetch('https://backk-fugf.onrender.com/api/empresa/registrar', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: usuario.nombre,
                correo: usuario.correo,
                plan: plan.nombre
              })
            })

            navigate('/dashboard')
          },
          onError: err => {
            console.error("❌ Error en el pago:", err)
            alert("Error procesando el pago.")
          }
        }).render(`#${containerId}`)
      }
    })
  }, [])

  const handleGratuito = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

    try {
      const res = await fetch('https://backk-fugf.onrender.com/api/empresa/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: usuario.nombre,
          correo: usuario.correo,
          plan: 'Básico'
        })
      })

      const data = await res.json()
      console.log('📦 Backend respondió:', data)
      alert('✅ Plan Básico activado')
      navigate('/dashboard')

    } catch (err) {
      console.error('❌ Error al registrar empresa:', err)
      alert('Hubo un error al activar el plan.')
    }
  }

  return (
    <div style={contenedor}>
      <h1 style={titulo}>Planes y Precios</h1>
      <div style={tarjetas}>
        {planes.map((plan) => (
          <div key={plan.nombre} style={card}>
            <h2 style={planTitle}>{plan.nombre}</h2>
            <p>{plan.descripcion}</p>
            <h3 style={{ margin: '1rem 0' }}>
              {plan.precio === 0 ? 'Gratis' : `$${plan.precio.toFixed(2)}`}
            </h3>

            {plan.precio === 0 ? (
              <button onClick={handleGratuito} style={botonGratuito}>Comenzar</button>
            ) : (
              <div id={`paypal-button-container-${plan.nombre}`}></div>
            )}
          </div>
        ))}
      </div>
      <p style={{ color: '#e0e7ff', fontSize: '0.95rem', marginTop: '1rem' }}>
        🔒 Tus pagos están protegidos con cifrado SSL y métodos seguros.
      </p>
    </div>
  )
}

const contenedor = { padding: '2rem', fontFamily: 'Poppins, sans-serif', color: 'white', textAlign: 'center' }
const titulo = { fontSize: '2rem', marginBottom: '2rem', color: '#007bff' }
const tarjetas = { display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }
const card = { backgroundColor: 'white', color: '#333', borderRadius: '10px', padding: '1.5rem', width: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
const planTitle = { color: '#007bff', marginBottom: '0.5rem' }
const botonGratuito = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer'
}
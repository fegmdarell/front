import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ConfirmacionPago() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const wompiTransactionId = params.get('id')
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
    const planSeleccionado = localStorage.getItem('planSeleccionado')

    if (wompiTransactionId && usuario.correo && planSeleccionado) {
      fetch('https://backk-fugf.onrender.com/api/wompi/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: wompiTransactionId,
          correo: usuario.correo,
          plan: planSeleccionado
        })
      })
      .then(res => res.json())
      .then(data => {
        alert('✅ Pago confirmado y plan activado');
        navigate('/dashboard');
      })
      .catch(() => alert('Error confirmando el pago'));
    }
  }, [location, navigate])

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Procesando pago...</h2>
    </div>
  )
}
import { useState, useRef, useEffect } from 'react';

// Simulación de empresas/contactos
const empresas = [
  { id: 1, nombre: "EcoSoluciones", logo: "https://ui-avatars.com/api/?name=EcoSoluciones" },
  { id: 2, nombre: "TechNova", logo: "https://ui-avatars.com/api/?name=TechNova" },
  { id: 3, nombre: "AgroFuturo", logo: "https://ui-avatars.com/api/?name=AgroFuturo" }
];

export default function Chat() {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresas[0]);
  const [mensajes, setMensajes] = useState({
    1: [
      { texto: "¡Hola EcoSoluciones!", propio: true },
      { texto: "¡Hola! ¿Cómo podemos colaborar?", propio: false }
    ],
    2: [
      { texto: "¡Hola TechNova!", propio: true }
    ],
    3: []
  });
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [empresaSeleccionada, mensajes]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim() === '') return;
    setMensajes(prev => ({
      ...prev,
      [empresaSeleccionada.id]: [
        ...(prev[empresaSeleccionada.id] || []),
        { texto: nuevoMensaje, propio: true }
      ]
    }));
    setNuevoMensaje('');
  };

  return (
    <div style={chatLayout}>
      {/* Lista de empresas */}
      <div style={contactosBar}>
        <h3 style={{ color: '#075e54', marginBottom: 16 }}>Empresas</h3>
        {empresas.map(emp => (
          <div
            key={emp.id}
            style={{
              ...contactoItem,
              background: emp.id === empresaSeleccionada.id ? '#e6f7ee' : 'transparent'
            }}
            onClick={() => setEmpresaSeleccionada(emp)}
          >
            <img src={emp.logo} alt={emp.nombre} style={contactoLogo} />
            <span>{emp.nombre}</span>
          </div>
        ))}
      </div>
      {/* Chat */}
      <div style={chatCard}>
        <div style={chatHeader}>
          <img src={empresaSeleccionada.logo} alt="Logo" style={{ width: 36, marginRight: 12 }} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>{empresaSeleccionada.nombre}</span>
        </div>
        <div style={chatBody}>
          {(mensajes[empresaSeleccionada.id] || []).map((msg, idx) => (
            <div
              key={idx}
              style={msg.propio ? burbujaPropia : burbujaAjena}
            >
              {msg.texto}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form style={chatInputBar} onSubmit={enviarMensaje}>
          <input
            style={chatInput}
            type="text"
            placeholder="Escribe un mensaje..."
            value={nuevoMensaje}
            onChange={e => setNuevoMensaje(e.target.value)}
          />
          <button style={chatBtn} type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

// 🎨 ESTILOS
const chatLayout = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f4f4f4 100%)', // Fondo igual que otras páginas
  fontFamily: 'Poppins, sans-serif'
};

const contactosBar = {
  width: 220,
  background: '#fff',
  borderRight: '1px solid #e0e0e0',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginLeft: 40,   // <-- Separa del menú lateral
  marginRight: 40,  // <-- Separa del cuadro de conversación
  borderRadius: 16,
  boxShadow: '0 4px 24px #0001'
};

const contactoItem = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '0.7rem 0.5rem',
  borderRadius: 10,
  cursor: 'pointer',
  transition: 'background 0.2s'
};
const contactoLogo = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  objectFit: 'cover',
  background: '#f4f4f4'
};
const chatCard = {
  flex: 1,
  width: 380,
  maxWidth: '95vw',
  height: 520,
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  margin: '0 auto',
  marginRight: 40,
  borderRadius: 28, // Borde más suave y redondeado
  boxShadow: '0 4px 24px #0001'
};
const chatHeader = {
  background: '#075e54',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '2px solid #25d366'
};
const chatBody = {
  flex: 1,
  padding: '1.2rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  background: '#f4f8fb' // Fondo claro, sin imagen ni negro
};
const burbujaPropia = {
  alignSelf: 'flex-end',
  background: 'linear-gradient(135deg, #dcf8c6 60%, #b9f5d8 100%)',
  color: '#222',
  padding: '0.7rem 1.1rem',
  borderRadius: '18px 18px 4px 18px',
  maxWidth: '80%',
  fontSize: '1rem',
  boxShadow: '0 2px 8px #0001'
};
const burbujaAjena = {
  alignSelf: 'flex-start',
  background: 'linear-gradient(135deg, #fff 60%, #e6e6e6 100%)',
  color: '#222',
  padding: '0.7rem 1.1rem',
  borderRadius: '18px 18px 18px 4px',
  maxWidth: '80%',
  fontSize: '1rem',
  boxShadow: '0 2px 8px #0001'
};
const chatInputBar = {
  display: 'flex',
  padding: '1rem',
  background: '#f0f0f0',
  borderTop: '1px solid #e0e0e0'
};
const chatInput = {
  flex: 1,
  padding: '0.7rem 1rem',
  borderRadius: 20,
  border: '1px solid #ccc',
  fontSize: '1rem',
  outline: 'none',
  marginRight: 12
};
const chatBtn = {
  background: 'linear-gradient(135deg, #25d366 60%, #128c7e 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 20,
  padding: '0.7rem 1.5rem',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px #25d36644'
};

import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [mensajes, setMensajes] = useState([
    { texto: "¡Hola! ¿En qué podemos ayudarte?", propio: false }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim() === '') return;
    setMensajes([...mensajes, { texto: nuevoMensaje, propio: true }]);
    setNuevoMensaje('');
    // Simulación de respuesta automática
    setTimeout(() => {
      setMensajes(mensajesActuales =>
        [...mensajesActuales, { texto: "¡Gracias por tu mensaje! Pronto te responderemos.", propio: false }]
      );
    }, 1000);
  };

  return (
    <div style={chatBg}>
      <div style={chatCard}>
        <div style={chatHeader}>
          <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="Chat" style={{ width: 36, marginRight: 12 }} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>Soporte Conecta</span>
        </div>
        <div style={chatBody}>
          {mensajes.map((msg, idx) => (
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
const chatBg = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #25d366 0%, #075e54 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const chatCard = {
  width: 380,
  maxWidth: '95vw',
  height: 600,
  background: '#f9f9f9',
  borderRadius: 18,
  boxShadow: '0 8px 32px #0003',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
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
  background: 'url(https://i.imgur.com/6QON1gF.png) repeat'
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

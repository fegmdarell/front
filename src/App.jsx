import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';
import Precios from './pages/Precios';
import Ayuda from './pages/Ayuda';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);

  const hideSidebar = location.pathname === '/' || location.pathname === '/registro';

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div style={layoutContainer}>
      {!hideSidebar && (
        <>
          <button onClick={toggleMenu} style={hamburgerButton}>☰</button>

          <nav
            className={menuVisible ? 'sidebar-visible' : 'sidebar-hidden'}
            style={{
              ...sidebarStyle,
              transition: 'transform 0.3s ease-in-out',
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              zIndex: 10
            }}
          >
            <h2 style={tituloSidebar}>🌐 Conecta</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/dashboard" style={link}>🏠 Dashboard</Link></li>
              <li><Link to="/perfil" style={link}>👤 Perfil</Link></li>
              <li><Link to="/chat" style={link}>💬 Chat</Link></li>
              <li><Link to="/precios" style={link}>💳 Precios</Link></li>
              <li><Link to="/ayuda" style={link}>❓ Ayuda</Link></li>
              <li>
                <button onClick={() => navigate('/')} style={logoutButton}>
                  🔒 Cerrar sesión
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}

      <main style={{ marginLeft: hideSidebar ? 0 : 260, marginRight: hideSidebar ? 0 : 300, flex: 1, padding: '2rem', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/ayuda" element={<Ayuda />} />
        </Routes>
      </main>

      {!hideSidebar && (
        <>
          <RightPanel />
          <ChatWidget />
        </>
      )}
    </div>
  );
}

// 🔔 Panel de notificaciones moderno
function RightPanel() {
  return (
    <div style={panelStyle}>
      <h3 style={panelTitle}>🔔 Notificaciones</h3>
      <div style={notiCard}>
        <span style={notiIcon}>📌</span>
        <div>
          <strong>Solicitud de conexión</strong>
          <p style={notiText}>EcoSoluciones quiere conectar contigo.</p>
        </div>
      </div>
      <div style={notiCard}>
        <span style={notiIcon}>💼</span>
        <div>
          <strong>Visita reciente</strong>
          <p style={notiText}>AgroFuturo revisó tu perfil hoy.</p>
        </div>
      </div>
      <div style={notiCard}>
        <span style={notiIcon}>💳</span>
        <div>
          <strong>Plan activo</strong>
          <p style={notiText}>Estás usando el plan <b>Básico</b>.</p>
        </div>
      </div>
    </div>
  );
}

// 💬 Chat flotante inferior derecho
function ChatWidget() {
  return (
    <div style={chatBubble}>
      💬 ¿Necesitas ayuda?
    </div>
  );
}

// 🎨 ESTILOS

const layoutContainer = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  fontFamily: 'Poppins, sans-serif'
};

const sidebarStyle = {
  width: 260,
  background: '#2c3e50',
  padding: 24,
  color: 'white'
};

const tituloSidebar = {
  marginBottom: '2.5rem',
  fontSize: '1.8rem',
  textAlign: 'center',
  marginTop: '1.5rem',
  fontWeight: 'bold'
};

const link = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '1.2rem',
  fontSize: '1.15rem'
};

const logoutButton = {
  background: '#ecf0f1',
  color: '#2c3e50',
  border: 'none',
  padding: '0.6rem 1rem',
  fontSize: '1rem',
  width: '100%',
  cursor: 'pointer',
  borderRadius: '4px',
  marginTop: '1.5rem'
};

const hamburgerButton = {
  position: 'fixed',
  top: 20,
  left: 20,
  zIndex: 20,
  fontSize: '1.8rem',
  background: '#ecf0f1',
  border: 'none',
  borderRadius: '4px',
  padding: '0.3rem 0.8rem',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
};

const panelStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '300px',
  height: '100vh',
  background: '#ffffff',
  padding: '2rem 1.5rem',
  boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  zIndex: 9,
  overflowY: 'auto'
};

const panelTitle = {
  fontSize: '1.3rem',
  marginBottom: '1.5rem',
  textAlign: 'center',
  color: '#2c3e50'
};

const notiCard = {
  display: 'flex',
  alignItems: 'flex-start',
  background: '#f9fbfc',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  gap: '0.75rem'
};

const notiIcon = {
  fontSize: '1.5rem',
  color: '#3498db',
  marginTop: '2px'
};

const notiText = {
  fontSize: '0.9rem',
  color: '#34495e',
  margin: '0.25rem 0 0 0'
};

const chatBubble = {
  position: 'fixed',
  bottom: '25px',
  right: '25px',
  background: '#3498db',
  color: 'white',
  padding: '0.8rem 1.2rem',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.95rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  zIndex: 15
};

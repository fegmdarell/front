import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';
import Precios from './pages/Precios';
import Ayuda from './pages/Ayuda';

// Si tienes estos componentes, mantenlos, si no, comenta o elimina estas líneas
import RightPanel from './components/RightPanel';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);

  // Oculta el sidebar en landing, login y registro
  const hideSidebar = location.pathname === '/' || location.pathname === '/registro' || location.pathname === '/login';

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
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
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

// 🎨 ESTILOS (puedes moverlos a un archivo aparte si prefieres)
const layoutContainer = {
  display: 'flex',
  minHeight: '100vh',
  background: '#f8fafc'
};

const sidebarStyle = {
  width: 260,
  background: '#fff',
  borderRight: '1px solid #e5e7eb',
  padding: '2rem 1rem 1rem 1rem',
  boxShadow: '2px 0 8px rgba(0,0,0,0.03)'
};

const tituloSidebar = {
  fontWeight: 700,
  fontSize: '1.4rem',
  marginBottom: '2rem',
  color: '#007bff'
};

const link = {
  display: 'block',
  padding: '0.7rem 1rem',
  color: '#333',
  textDecoration: 'none',
  borderRadius: '6px',
  marginBottom: '0.5rem',
  fontWeight: 500
};

const logoutButton = {
  background: '#f87171',
  color: '#fff',
  border: 'none',
  padding: '0.7rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600,
  marginTop: '1rem'
};

const hamburgerButton = {
  position: 'fixed',
  top: 20,
  left: 20,
  zIndex: 20,
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: 40,
  height: 40,
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
};

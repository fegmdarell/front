import { useEffect } from 'react';

export default function Toast({ mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Se cierra en 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={toastStyle}>
      {mensaje}
    </div>
  );
}

const toastStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#2ecc71',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  fontSize: '1rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  zIndex: 1000,
  transition: 'opacity 0.3s ease'
};

import React from 'react';

export default function PoliticaDatos() {
  return (
    <div style={wrapper}>
      <h2 style={titulo}>Política de Protección de Datos</h2>
      <p>
        En <b>Conecta</b> nos comprometemos a proteger la privacidad y seguridad de tus datos personales.
        Toda la información que nos proporcionas es utilizada únicamente para fines relacionados con la plataforma y nunca será compartida con terceros sin tu consentimiento.
      </p>
      <ul>
        <li>✔️ Tus datos están protegidos mediante cifrado y buenas prácticas de seguridad.</li>
        <li>✔️ Puedes solicitar la eliminación o modificación de tus datos en cualquier momento.</li>
        <li>✔️ Solo recolectamos la información necesaria para brindarte un mejor servicio.</li>
        <li>✔️ Cumplimos con la legislación colombiana y estándares internacionales de protección de datos.</li>
      </ul>
      <p>
        Si tienes dudas sobre nuestra política de datos, contáctanos a <a href="mailto:soporte@conecta.com">soporte@conecta.com</a>.
      </p>
    </div>
  );
}

const wrapper = {
  maxWidth: 600,
  margin: '3rem auto',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 16px #0001',
  padding: '2rem',
  color: '#222'
};

const titulo = {
  textAlign: 'center',
  color: '#007bff',
  marginBottom: 24
};
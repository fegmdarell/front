import React from 'react';

export default function MisReuniones() {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: 16,
      margin: "2rem 0",
      boxShadow: "0 2px 8px #0001"
    }}>
      <h3 style={{ color: "#007bff" }}>Mis reuniones</h3>
      <ul>
        <li>EcoSoluciones - 2025-07-01 a las 10:00</li>
        <li>AgroFuturo - 2025-07-03 a las 15:00</li>
      </ul>
    </div>
  );
}
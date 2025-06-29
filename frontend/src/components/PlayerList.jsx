// src/components/PlayerList.jsx
import React from "react";

function PlayerList({ players }) {
  if (!players || players.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
        Nenhum resultado encontrado.
      </p>
    );
  }

  return (
    <div className="player-list-container">
      {players.map((p) => (
        <div key={p.id} className="player-card">
          <h3>{p.name}</h3>
          <p><strong>Time:</strong> {p.team || "‑"}</p>
          <p><strong>Posição:</strong> {p.position || "‑"}</p>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;

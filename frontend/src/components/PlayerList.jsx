import React, { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

function PlayerList({ players }) {
  const { setPlayers } = useContext(PlayerContext);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/player/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // Atualiza o estado removendo o jogador
        setPlayers((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error("Erro ao excluir");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          <div>
            <h3>{p.name}</h3>
            <p><strong>Time:</strong> {p.team || "‑"}</p>
            <p><strong>Posição:</strong> {p.position || "‑"}</p>
          </div>

          <button className="delete-btn" onClick={() => handleDelete(p.id)}>
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;

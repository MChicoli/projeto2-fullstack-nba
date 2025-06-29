import { createContext, useState } from "react";

export const PlayerContext = createContext();

/**
 * Provider global para lista de jogadores.
 * Envolve toda a aplicação lá no main.jsx.
 */
export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
}

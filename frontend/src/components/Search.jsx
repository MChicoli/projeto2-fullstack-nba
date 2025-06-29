import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PlayerContext } from "../contexts/PlayerContext";
import PlayerList from "./PlayerList";
import buscaLogo from "../assets/busca-logo.svg";
import "./PlayerSearch.css";

function Search() {
  const { setPlayers, players } = useContext(PlayerContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/search?q=${data.name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.ok) {
        const result = await response.json();
        setPlayers(result);
      } else {
        console.error("Erro na busca");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
    } finally {
      reset();
    }
  };

  // CORREÇÃO: O return deve estar DENTRO da função Search()
  return (
    <div className="player-search-container">
      <h1 className="search-title">Buscar Jogadores da NBA</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="search-box">
          <input
            type="text"
            placeholder="Digite o nome do jogador..."
            {...register("name", {
              required: "Digite o nome do jogador",
              minLength: { value: 3, message: "Mínimo de 3 caracteres" }
            })}
            className={errors.name ? "input-error" : ""}
          />
          <button type="submit" className="search-button">
            <img src={buscaLogo} alt="Buscar" className="search-icon" />
            Buscar
          </button>
        </div>

        {errors.name && (
          <p className="error-message">{errors.name.message}</p>
        )}
      </form>

      <div className="results-container">
        <PlayerList players={players} />
      </div>
    </div>
  );
}

export default Search;
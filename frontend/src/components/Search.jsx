import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PlayerContext } from "../contexts/PlayerContext";
import PlayerList from "./PlayerList";
import "./PlayerSearch.css";
import buscaLogo from "../assets/busca-logo.svg";

function Search() {
  const { players, setPlayers } = useContext(PlayerContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async ({ name }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/search?q=${name}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setPlayers(data);
      } else {
        console.error("Erro na busca");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
    } finally {
      reset();
    }
  };

  return (
    <div className="player-search-container">
      <h1 className="search-title">Buscar Jogadores da NBA</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/insert" className="add-btn">
          + Adicionar Jogador
        </Link>
      </div>
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

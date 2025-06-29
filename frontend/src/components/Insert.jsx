import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Insert.css";

function Insert() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [msg, setMsg] = useState("");

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.status === 201) {
        setMsg("Jogador inserido com sucesso! 🎉");
        reset();
      } else {
        const { error } = await res.json();
        setMsg(error || "Erro ao inserir");
      }
    } catch (err) {
      setMsg("Erro de rede");
      console.error(err);
    }
  };

  return (
    <div className="insert-container">
      <h2>Adicionar Jogador</h2>

      {msg && <p className="insert-msg">{msg}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="insert-form">
        <input
          placeholder="Nome completo"
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <input
          placeholder="Time"
          {...register("team")}
        />

        <input
          placeholder="Posição (ex: SF)"
          {...register("position")}
        />

        <input
          placeholder="Altura (ex: 2.06m)"
          {...register("height")}
        />

        <input
          placeholder="Peso (ex: 113kg)"
          {...register("weight")}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Insert;

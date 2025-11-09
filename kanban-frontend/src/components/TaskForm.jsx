import { useState } from "react";
import { createTask } from "../api";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Não feito");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status };

    try {
      const savedTask = await createTask(newTask);
      onTaskCreated(savedTask);
      setTitle("");
      setDescription("");
      setStatus("Não feito");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e1e1e",
        padding: "20px",
        borderRadius: "8px",
        color: "#ffffff",
      }}
    >
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          padding: "8px",
          width: "200px",
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          border: "1px solid #444",
        }}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          border: "1px solid #444",
        }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: "8px",
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          border: "1px solid #444",
        }}
      >
        <option value="Não feito">Não feito</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#ffffff",
          color: "#121212",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
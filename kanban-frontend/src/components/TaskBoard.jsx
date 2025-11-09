import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";

const statuses = ["Não feito", "Em andamento", "Concluído"];

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Não feito",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleCreate = async () => {
    if (!newTask.title.trim()) return;

    const taskToCreate = {
      ...newTask,
      id: crypto.randomUUID(),
    };

    try {
      const criada = await createTask(taskToCreate);
      setTasks((prev) => [...prev, criada]);
      setNewTask({ title: "", description: "", status: "Não feito" });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async () => {
    try {
      await updateTask(editingTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? editingTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", padding: "20px", minHeight: "100vh" }}>
      <div style={{ marginBottom: "40px", maxWidth: "600px" }}>
        <h3 style={{ color: "#fff" }}>Criar nova tarefa</h3>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "4px",
          }}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "4px",
          }}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "4px",
          }}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button style={{ padding: "8px 16px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "4px" }} onClick={handleCreate}>
          Criar
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {statuses.map((status) => (
          <div key={status} style={{
            width: "300px",
            border: "1px solid #444",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#1e1e1e",
          }}>
            <h3 style={{ color: "#fff" }}>{status}</h3>
            {Array.isArray(tasks) &&
              tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    style={{
                      backgroundColor: "#2c2c2c",
                      color: "#fff",
                      padding: "10px",
                      marginBottom: "10px",
                      borderRadius: "6px",
                    }}
                  >
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button style={{ backgroundColor: "#444", color: "#fff", border: "none", padding: "6px", borderRadius: "4px" }} onClick={() => handleEdit(task)}>Editar</button>
                      <button style={{ backgroundColor: "#b00020", color: "#fff", border: "none", padding: "6px", borderRadius: "4px" }} onClick={() => handleDelete(task.id)}>Excluir</button>
                    </div>
                  </div>
                ))}
          </div>
        ))}
      </div>

      {editingTask && (
        <div style={{ marginTop: "40px", maxWidth: "600px" }}>
          <h3 style={{ color: "#fff" }}>Editando tarefa</h3>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "4px",
            }}
          />
          <input
            type="text"
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "4px",
            }}
          />
          <select
            value={editingTask.status}
            onChange={(e) =>
              setEditingTask({ ...editingTask, status: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#1e1e1e",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "4px",
            }}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button style={{ padding: "8px 16px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "4px", marginRight: "10px" }} onClick={handleUpdate}>
            Salvar
          </button>
          <button style={{ padding: "8px 16px", backgroundColor: "#666", color: "#fff", border: "none", borderRadius: "4px" }} onClick={() => setEditingTask(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskBoard;
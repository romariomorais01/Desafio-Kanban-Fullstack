export async function getTasks() {
  const res = await fetch("http://localhost:8080/tasks");
  if (!res.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return await res.json();
}

export async function createTask(task) {
  const res = await fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return await res.json();
}

export async function updateTask(task) {
  const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }

  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao excluir tarefa");
  }
}
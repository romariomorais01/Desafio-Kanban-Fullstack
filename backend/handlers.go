package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Importa a struct Task do models.go
// Se estiver em outro pacote, ajuste o import conforme necessário
// Exemplo: import "meuprojeto/models"

var tasks []Task

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	var newTask Task
	if err := json.NewDecoder(r.Body).Decode(&newTask); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	if !isValidStatus(newTask.Status) {
		http.Error(w, "Status inválido", http.StatusBadRequest)
		return
	}

	tasks = append(tasks, newTask)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newTask)
}

func updateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var updatedTask Task
	if err := json.NewDecoder(r.Body).Decode(&updatedTask); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	if !isValidStatus(updatedTask.Status) {
		http.Error(w, "Status inválido", http.StatusBadRequest)
		return
	}

	for i, task := range tasks {
		if task.ID == id {
			updatedTask.ID = id
			tasks[i] = updatedTask
			log.Printf("Tarefa atualizada: %+v\n", updatedTask)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(updatedTask)
			return
		}
	}

	http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	for i, task := range tasks {
		if task.ID == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			log.Printf("Tarefa excluída: %s\n", id)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}

	http.Error(w, "Tarefa não encontrada", http.StatusNotFound)
}

func isValidStatus(status string) bool {
	validStatuses := []string{"Concluído", "Em andamento", "Não feito"}
	for _, s := range validStatuses {
		if status == s {
			return true
		}
	}
	return false
}

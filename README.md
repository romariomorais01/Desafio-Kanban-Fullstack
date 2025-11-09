Desafio Kanban Fullstack

markdown
Desafio Kanban Fullstack

Sistema Kanban desenvolvido como desafio fullstack, utilizando React no frontend e Go no backend. Permite criar, editar, excluir e visualizar tarefas organizadas por status.

###Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Backend
- [Go (Golang)](https://golang.org/)
- [Gin](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [SQLite](https://www.sqlite.org/) ou [PostgreSQL](https://www.postgresql.org/)


##  Estrutura de Pastas

Desafio-Kanban-Fullstack/
├── backend/
│   ├── main.go
│   ├── controllers/
│   ├── models/
│   └── routes/
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── components/
│   │   ├── TaskBoard.jsx
│   │   └── TaskForm.jsx
│   └── services/
│       └── api.js
├── public/
│   └── index.html
├── .gitignore
├── README.md
└── package.json


##  Funcionalidades

- ✅ Criar tarefas
- ✅ Editar tarefas
- ✅ Excluir tarefas
- ✅ Listar tarefas por status
- ✅ Persistência via API REST
- ✅ Interface responsiva com TailwindCSS

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js instalado
- Go instalado

### Frontend

bash
# Acesse a pasta do frontend
cd src

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev


### Backend

bash
# Acesse a pasta do backend
cd backend

# Execute a aplicação Go
go run main.go


## 🌐 API Endpoints

| Método | Rota             | Descrição              |
|--------|------------------|------------------------|
| GET    | /tasks           | Lista todas as tarefas |
| POST   | /tasks           | Cria uma nova tarefa   |
| PUT    | /tasks/:id       | Atualiza uma tarefa    |
| DELETE | /tasks/:id       | Exclui uma tarefa      |


## Testes

Em breve serão adicionados testes unitários com:
- Jest (frontend)
- Go test (backend)



## Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar.



##  Autor

Romário Morais  
[GitHub](https://github.com/romariomorais01) • [LinkedIn](https://www.linkedin.com/in/romariomorais30)

import React from "react";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "2.5rem",
        color: "#333"
      }}>
        Kanban Fullstack
      </h1>
      <TaskBoard />
    </div>
  );
}

export default App;
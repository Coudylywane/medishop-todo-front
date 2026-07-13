import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, description, done: false });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task.id, { ...task, done: !task.done });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="app">
      <h1>Registre des tâches</h1>
      <p className="subtitle">MediShop — suivi interne d'équipe</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">
          Aucune tâche pour le moment. Ajoutes-en une ci-dessus.
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={`checkbox ${task.done ? "done" : ""}`}
                onClick={() => handleToggle(task)}
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span
                className={`title ${task.done ? "done" : ""}`}
                onClick={() => handleToggle(task)}
              >
                {task.title}
              </span>
              <button className="delete" onClick={() => handleDelete(task.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

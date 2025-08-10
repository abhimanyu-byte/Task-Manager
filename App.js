import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

const FILTERS = {
  ALL: "All",
  COMPLETED: "Completed",
  PENDING: "Pending",
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTERS.COMPLETED) return task.completed;
    if (filter === FILTERS.PENDING) return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <div className="filter-buttons">
        {Object.values(FILTERS).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

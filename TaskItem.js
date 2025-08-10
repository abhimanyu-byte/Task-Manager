import React, { useState } from "react";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    updateTask({ ...task, title: editTitle.trim(), dueDate: editDueDate || null });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || "");
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <input
            type="date"
            className="edit-input"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={saveEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="task-content"
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to edit"
          >
            {task.title}
            {task.dueDate && <span className="due-date"> (Due: {task.dueDate})</span>}
          </div>
          <div className="task-actions">
            <button onClick={() => deleteTask(task.id)} title="Delete task">
              &#x1F5D1;
            </button>
          </div>
        </>
      )}
    </li>
  );
}

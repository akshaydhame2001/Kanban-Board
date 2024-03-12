import React, { useState } from "react";
import "./index.css";

const initialTasks = [
  { id: 1, title: "Task 1", status: "backlog" },
  { id: 2, title: "Task 2", status: "backlog" },
  { id: 3, title: "Task 3", status: "doing" },
  { id: 4, title: "Task 4", status: "doing" },
  { id: 5, title: "Task 5", status: "review" },
  { id: 6, title: "Task 6", status: "done" },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, direction) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        switch (direction) {
          case "forward":
            if (task.status === "backlog") task.status = "doing";
            else if (task.status === "doing") task.status = "review";
            else if (task.status === "review") task.status = "done";
            break;
          case "backward":
            if (task.status === "doing") task.status = "backlog";
            else if (task.status === "review") task.status = "doing";
            else if (task.status === "done") task.status = "review";
            break;
          default:
            break;
        }
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="kanban-board">
      <div className="list">
        <h2>Backlog</h2>
        {tasks
          .filter((task) => task.status === "backlog")
          .map((task) => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
      </div>

      <div className="list">
        <h2>Doing</h2>
        {tasks
          .filter((task) => task.status === "doing")
          .map((task) => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
      </div>

      <div className="list">
        <h2>Review</h2>
        {tasks
          .filter((task) => task.status === "review")
          .map((task) => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
      </div>

      <div className="list">
        <h2>Done</h2>
        {tasks
          .filter((task) => task.status === "done")
          .map((task) => (
            <Task key={task.id} task={task} onMove={moveTask} />
          ))}
      </div>
    </div>
  );
};

const Task = ({ task, onMove }) => {
  const { id, title, status } = task;

  const handleMove = (direction) => {
    onMove(id, direction);
  };

  const isForwardDisabled = status === "done";
  const isBackwardDisabled = status === "backlog";

  return (
    <div className="task">
      <p>{title}</p>
      <div className="buttons">
        <button
          onClick={() => handleMove("backward")}
          disabled={isBackwardDisabled}
        >
          <i className="fas fa-arrow-left"></i>
          Backward
        </button>
        <button
          onClick={() => handleMove("forward")}
          disabled={isForwardDisabled}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default App;

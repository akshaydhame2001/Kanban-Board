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
          &lt;
        </button>
        <button
          onClick={() => handleMove("forward")}
          disabled={isForwardDisabled}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import "./styles.css";

// const initialTasks = [
//   { id: 1, title: "Task 1", status: "backlog" },
//   { id: 2, title: "Task 2", status: "backlog" },
//   { id: 3, title: "Task 3", status: "doing" },
//   { id: 4, title: "Task 4", status: "doing" },
//   { id: 5, title: "Task 5", status: "review" },
//   { id: 6, title: "Task 6", status: "done" },
// ];

// const App = () => {
//   const [tasks, setTasks] = useState(initialTasks);

//   const moveTask = (taskId, direction) => {
//     setTasks((prevTasks) => {
//       return prevTasks.map((task) => {
//         if (task.id === taskId) {
//           switch (direction) {
//             case "forward":
//               task.status = getNextStatus(task.status, true);
//               break;
//             case "backward":
//               task.status = getNextStatus(task.status, false);
//               break;
//             default:
//               break;
//           }
//         }
//         return task;
//       });
//     });
//   };

//   const getNextStatus = (currentStatus, forward) => {
//     const statuses = ["backlog", "doing", "review", "done"];
//     const currentIndex = statuses.indexOf(currentStatus);
//     const nextIndex = forward ? currentIndex + 1 : currentIndex - 1;

//     return statuses[nextIndex] || currentStatus;
//   };

//   return (
//     <div className="kanban-board">
//       {["backlog", "doing", "review", "done"].map((status) => (
//         <div className="list" key={status}>
//           <h2>{capitalizeFirstLetter(status)}</h2>
//           {tasks
//             .filter((task) => task.status === status)
//             .map((task) => (
//               <Task key={task.id} task={task} onMove={moveTask} />
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Task = ({ task, onMove }) => {
//   const { id, title, status } = task;

//   const handleMove = (direction) => {
//     onMove(id, direction);
//   };

//   const isForwardDisabled = status === "done";
//   const isBackwardDisabled = status === "backlog";

//   return (
//     <div className="task">
//       <p>{title}</p>
//       <div className="buttons">
//         <button
//           onClick={() => handleMove("backward")}
//           disabled={isBackwardDisabled}
//         >
//           Backward
//         </button>
//         <button
//           onClick={() => handleMove("forward")}
//           disabled={isForwardDisabled}
//         >
//           Forward
//         </button>
//       </div>
//     </div>
//   );
// };

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// export default App;

// import React, { useState } from "react";
// import "./styles.css";

// const KanbanBoard = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, name: "Task 1", stage: 0 },
//     { id: 2, name: "Task 2", stage: 0 },
//     { id: 3, name: "Task 3", stage: 1 },
//     { id: 4, name: "Task 4", stage: 2 },
//     { id: 5, name: "Task 5", stage: 3 },
//   ]);

//   const stages = ["Backlog", "To Do", "In Progress", "Done"];

//   const moveToForward = (task) => {
//     const updatedTasks = tasks.map((t) =>
//       t.id === task.id ? { ...t, stage: t.stage + 1 } : t
//     );
//     console.log(task);

//     setTasks(updatedTasks);
//   };

//   const moveToBackward = (task) => {
//     const updatedTasks = tasks.map((t) =>
//       t.id === task.id ? { ...t, stage: t.stage - 1 } : t
//     );
//     setTasks(updatedTasks);
//   };

//   return (
//     <div className="kanban-board">
//       {stages.map((stage, index) => (
//         <div key={index} className="board-column">
//           <h2>{stage}</h2>
//           <ul>
//             {tasks
//               .filter((task) => task.stage === index)
//               .map((task) => (
//                 <li key={task.id} className="task">
//                   <div className="task-content">{task.name}</div>
//                   <div className="task-buttons">
//                     <button
//                       onClick={() => moveToBackward(task)}
//                       disabled={task.stage === 0}
//                     >
//                       &lt;
//                     </button>
//                     <button
//                       onClick={() => moveToForward(task)}
//                       disabled={task.stage === stages.length - 1}
//                     >
//                       &gt;
//                     </button>
//                   </div>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default KanbanBoard;

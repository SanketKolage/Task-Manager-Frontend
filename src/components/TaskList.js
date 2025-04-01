import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  handleToggleCompletion,
  handleDeleteTask,
  handleEditTask,
  editMode,
  updateTask,
  handleUpdateTask,
  handleUpdateInputChange,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskItem
            task={task}
            handleToggleCompletion={handleToggleCompletion}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            editMode={editMode}
            updateTask={updateTask}
            handleUpdateTask={handleUpdateTask}
            handleUpdateInputChange={handleUpdateInputChange}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

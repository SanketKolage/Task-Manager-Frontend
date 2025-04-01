import React from "react";

function TaskInput({ newTask, handleInputChange, handleAddTask }) {
  return (
    <div className="input-group">
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Task title"
        className="inputtitle"
        required
      />
      <input
        type="text"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Task description"
        className="inputdesc"
        required
      />
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleInputChange}
        placeholder="Due date"
        className="inputdate"
      />
      <button className="addbtn" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;

import React from "react";

function TaskItem({
  task,
  handleToggleCompletion,
  handleDeleteTask,
  handleEditTask,
  editMode,
  updateTask,
  handleUpdateTask,
  handleUpdateInputChange,
}) {
  return (
    <div className="container">
      <div className="tasktitle">
        <h3>Title</h3>
        {task.title}
      </div>
      <div className="taskdesc">
        <h3>Description</h3>
        {task.description}
      </div>
      {task.dueDate && (
        <span className="remDays">
          <h3>Remaining days:</h3> {calculateRemainingDays(task.dueDate)}
        </span>
      )}
      <div className="status">
        <h3>Completed:</h3> {task.completed.toString()}
      </div>
      <div className="action">
        <button
          type="button"
          className="btncomplete"
          onClick={() => handleToggleCompletion(task.title)}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          type="button"
          className="btndelete"
          onClick={() => handleDeleteTask(task.title)}
        >
          Delete
        </button>
        {editMode === (task._id || task.title) ? (
          <div>
            <input
              className="inputtitle"
              type="text"
              name="title"
              value={updateTask.title}
              onChange={handleUpdateInputChange}
              placeholder="Task title"
              required
            />
            <input
              className="inputdesc"
              type="text"
              name="description"
              value={updateTask.description}
              onChange={handleUpdateInputChange}
              placeholder="Task description"
              required
            />
            <input
              className="inputdate"
              type="date"
              name="dueDate"
              value={updateTask.dueDate}
              onChange={handleUpdateInputChange}
            />
            <button className="editbtn" onClick={() => handleUpdateTask(task)}>
              Update Task
            </button>
          </div>
        ) : (
          <button className="editbtn" onClick={() => handleEditTask(task)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

function calculateRemainingDays(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDifference = due.getTime() - today.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return remainingDays >= 0 ? remainingDays : "Expired";
}

export default TaskItem;

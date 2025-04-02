import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    axios
      .get("https://task-manager-backend-5awc.onrender.com/api/tasks")
      .then((response) => setTasks(response.data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) {
      alert("Title and Description are required!");
      return;
    }

    axios
      .post("https://task-manager-backend-5awc.onrender.com/api/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data.task]);
        setNewTask({ title: "", description: "", dueDate: "" });
        alert("Task added successfully!");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleToggleCompletion = (title) => {
    axios
      .put(`https://task-manager-backend-5awc.onrender.com/api/tasks/completion/${encodeURIComponent(title)}`)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.title === title ? response.data.task : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:"));
  };

  const handleDeleteTask = (title) => {
    axios
      .delete(`https://task-manager-backend-5awc.onrender.com/api/tasks/${encodeURIComponent(title)}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.title !== title);
        setTasks(updatedTasks);
        alert(`Task with title "${title}" deleted successfully`);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEditTask = (task) => {
    setUpdateTask({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });
    setEditMode(task._id || task.title);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleUpdateTask = (task) => {
    if (!updateTask.title || !updateTask.description) {
      alert("Title and Description are required!");
      return;
    }

    const identifier = task._id || task.title;
    axios
      .put(`https://task-manager-backend-5awc.onrender.com/api/tasks/${identifier}`, updateTask)
      .then((response) => {
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? response.data.task : t
        );
        setTasks(updatedTasks);
        setUpdateTask({ title: "", description: "", dueDate: "" });
        setEditMode(null);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskInput
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        editMode={editMode}
        updateTask={updateTask}
        handleUpdateTask={handleUpdateTask}
        handleUpdateInputChange={handleUpdateInputChange}
      />
    </div>
  );
}

export default TaskManager;

import axios from "axios";

const API_URL = "http://localhost:3001/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data.tasks;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data.task;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data.task;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskCompletion = async (id) => {
  const response = await axios.put(`${API_URL}/completion/${id}`);
  return response.data.task;
};

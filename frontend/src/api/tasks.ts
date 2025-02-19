import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async (userId: string) => {
  return axios.get(`${API_URL}/${userId}`);
};

export const createTask = async (userId: string, title: string, description: string) => {
  return axios.post(API_URL, { userId, title, description });
};

export const updateTask = async (taskId: string, completed: boolean) => {
  return axios.put(`${API_URL}/${taskId}`, { completed });
};

export const deleteTask = async (taskId: string) => {
  return axios.delete(`${API_URL}/${taskId}`);
};

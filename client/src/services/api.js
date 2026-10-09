import axios from 'axios';

// Create an Axios instance configured to talk to our backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Intercept requests and add the VIP wristband (JWT) if we have one
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

// Task API
export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API;

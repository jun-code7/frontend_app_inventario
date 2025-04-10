import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/inventario', // Ajusta si usas otro puerto
});

export default api;

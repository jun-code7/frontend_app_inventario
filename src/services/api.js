import axios from 'axios';

const api = axios.create({
  baseURL: 'https://db-supabase.onrender.com/api/inventario/', // Ajusta si usas otro puerto
});

export default api;

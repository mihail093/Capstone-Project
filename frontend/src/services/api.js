import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere il token di autenticazione
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API per l'autenticazione
export const authApi = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// API per le piante
export const plantApi = {
  getAll: () => api.get('/plants'),
  getById: (id) => api.get(`/plants/${id}`),
  create: (plantData) => api.post('/plants', plantData, {
      headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, plantData) => api.put(`/plants/${id}`, plantData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/plants/${id}`),
  getByHabitat: (habitat) => api.get(`/plants/habitat/${habitat}`),
  addComment: (id, comment) => api.post(`/plants/${id}/comments`, comment),
  getComments: (id) => api.get(`/plants/${id}/comments`),
};

// API per i prodotti
export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, productData) => api.put(`/products/${id}`, productData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  search: (query) => api.get(`/products/search/${query}`),
};

// API per gli utenti
export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.patch(`/users/${id}`, userData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;
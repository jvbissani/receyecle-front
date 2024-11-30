// axiosSetup.js
import axios from 'axios';

// Crie a instância do axios com as configurações desejadas
axios.defaults.baseURL = 'http://localhost:8008'; // Substitua pela URL do seu backend
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Adicione um interceptor para incluir o token em todas as requisições
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Email'] = `Bearer ${email}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Adicione um interceptor para lidar com respostas
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para a página de login
      localStorage.removeItem('token'); // Remova o token inválido
      window.location.href = '/login'; // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);

export default axios;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && error.response.data.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/renew-token`, { token: localStorage.getItem('token') });
        localStorage.setItem('token', data.token);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
        return api(originalRequest);
      } catch (e) {
        console.error('Token renewal failed', e);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

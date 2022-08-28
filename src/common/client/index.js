import axios from 'axios';

const client = axios.create({
  baseURL: '/api/v1',
});

client.interceptors.request.use(
  (config) => {
    const newConfig = config;

    const user = JSON.parse(localStorage.getItem('user') || null);

    if (user) {
      newConfig.headers.Authorization = `Bearer ${user.token}`;
    }

    return newConfig;
  },
  (err) => Promise.reject(err),
);

export default client;

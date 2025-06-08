import axios from 'axios';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use((rep) => {
  const { success, message, data } = rep.data;
  if (success) {
    return data;
  } else {
    // TODO: 业务报错
    return Promise.reject(new Error(message));
  }
});

export default service;

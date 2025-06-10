import axios from 'axios';
import useUserStore from '@/store/modules/user';
import { message as msg } from '@/libs';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
      return config;
    }
    return config;
  },
  (error) => {
    const userStore = useUserStore();
    if (error.response && error.response.data && error.response.data.status === 401) {
      userStore.loginout();
    }
    return Promise.reject(error);
  }
);

service.interceptors.response.use((rep) => {
  const { success, message, data } = rep.data;
  if (success) {
    return data;
  } else {
    // TODO: 业务报错
    msg('error', message);
    return Promise.reject(new Error(message));
  }
});

export default service;

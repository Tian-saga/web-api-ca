import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token; // 自动附加 Token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;

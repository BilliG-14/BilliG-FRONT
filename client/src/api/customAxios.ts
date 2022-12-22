import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://port-0-village-token-dpuqy925lbn63gyo.gksl2.cloudtype.app',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
};

const api: AxiosInstance = axios.create(axiosConfig);

const requestRefresh = async () => {
  try {
    const refreshed = await api.get('/refresh');
    axios.defaults.headers.common.Authorization = `Bearer ${refreshed.data.token}`;

    return refreshed.data.token;
  } catch (error) {
    console.log(error);
  }
};

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = localStorage.getItem('token');

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log('request interceptor config', config);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;
      const newAccessToken = await requestRefresh();
      console.log(newAccessToken);
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default api;

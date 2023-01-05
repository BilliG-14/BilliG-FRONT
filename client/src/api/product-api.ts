import api from './customAxios';

export const getUserInformation = () => api.get('/user/me');

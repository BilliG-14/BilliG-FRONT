import api from './customAxios';

import { UpdateUserType } from 'types/userType';
export const getMyInfo = async () => {
  try {
    const userInformation = await api.get('/user/me');
    return userInformation.data;
  } catch (error) {
    alert('유저 정보 불러오기 실패하였습니다.');
  }
};

export const getUserInfoByuserId = async () => {
  try {
    const res = await api.get(`/user11/${localStorage.getItem('userId')}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiUser = {
  GETALL: async () => {
    const res = await api.get('user');
    return res.data;
  },
  GET: (id: string | undefined) => async () => {
    const res = await api.get(`user/${id}`);
    return res.data;
  },
  UPDATE: (id: string) => async (data: UpdateUserType) => {
    const res = await api.patch(`user/${id}`, data);
    return res.data;
  },
};

export const getUsers = async () => {
  try {
    const data = await apiUser.GETALL();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id: string | undefined) => async () => {
  try {
    const res = await api.get(`user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

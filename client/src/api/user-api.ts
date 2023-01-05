import api from './customAxios';

export const getUserInfo = async () => {
  try {
    const userInformation = await api.get('/user/me');
    return userInformation;
  } catch (error) {
    alert('유저 정보 불러오기 실패하였습니다.');
  }
};

export const getUserInfoByuserId = async () => {
  try {
    const res = await api.get(`/user/${localStorage.getItem('userId')}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

import api from '../../api/customAxios';

const getUserInfo = async () => {
  try {
    const userInformation = await api.get('/user/me');
    return userInformation;
  } catch (error) {
    alert('유저 정보 불러오기 실패하였습니다.');
  }
};

export default getUserInfo;

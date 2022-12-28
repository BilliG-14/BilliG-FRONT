import api from '../../api/customAxios';

const getUserInfo = async () => {
  try {
    const userInformation = await api.get('/user/me');
    return userInformation;
  } catch (error) {
    console.log(error);
  }
};

export default getUserInfo;

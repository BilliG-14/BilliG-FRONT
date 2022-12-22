import api from '../../api/customAxios';
const getUserInfo = async () => {
  try {
    const userInfo = await api.get('/user/me');
    const id = localStorage.getItem('userId');
    const uid = userInfo.data._id;
    if (userInfo.status === 200 && id === uid) {
      console.log('userInfo: ', userInfo);
      console.log('userInfo.data: ', userInfo.data);
      return { userInfo, id };
    } else {
      console.log('로그인이 정상적이지 않습니다.');
    }
  } catch (error) {
    console.log(error);
  }
};

export default getUserInfo;

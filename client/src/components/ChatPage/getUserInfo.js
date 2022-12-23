import api from '../../api/customAxios';

const getUserInfo = async () => {
  try {
    // const { userInfo, setUserInfo } = chatUserStore;

    const userInformation = await api.get('/user/me');
    // const id = localStorage.getItem('userId');
    // const uid = userInformation.data._id;

    // setUserInfo(userInformation.data);

    // if (userInformation.status === 200 && id === uid) {
    //   console.log('userInformation: ', userInformation);
    //   console.log('userInformation.data: ', userInformation.data);

    //   console.log('내가원하는값:', userInfo);
    return userInformation;
    // } else {
    //   console.log('로그인이 정상적이지 않습니다.');
    // }
  } catch (error) {
    console.log(error);
  }
};

export default getUserInfo;

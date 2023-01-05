import api from './customAxios';

export const getUserInformation = async () => {
  try {
    const userInformation = await api.get('/user/me');
    return userInformation;
  } catch (err) {
    alert('사용자를 찾을 수 없습니다. \n로그인 화면으로 이동합니다.');
  }
};

export const getPostDetail = async (id: string | undefined) => {
  try {
    const res = await api.get(`/product/${id}`);
    return res.data;
  } catch (error) {
    alert(`게시글을 불러올 수 없습니다. \n에러내용 : ${error}`);
  }
};

// * 게시물 ,거래중, 거래완료 조회 api (myInfo)
export const getDealList = async (
  target: string,
  page: number,
  stateOfTransaction: string,
  postType?: string,
) => {
  const res = await api.get(
    `/product/page?${target}=${localStorage.getItem('userId')}${
      postType ? `&postType=${postType}` : ''
    }&per=8&page=${page}&stateOfTransaction=${stateOfTransaction}`,
  );

  return res.data;
};

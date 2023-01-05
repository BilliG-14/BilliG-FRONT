import api from './customAxios';

export const getChatRoom = async (id: string) => {
  try {
    const chatInformation = await api.get(`/chat/${id}`);
    return chatInformation.data;
  } catch (error) {
    alert('채팅방 불러오기 실패하였습니다.');
  }
};

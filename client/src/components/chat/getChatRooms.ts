import api from '../../api/customAxios';

const getChatRooms = async () => {
  try {
    const chatInformation = await api.get('/chat');
    return chatInformation.data;
  } catch (error) {
    alert('채팅방 목록 불러오기 실패하였습니다.');
  }
};

export default getChatRooms;

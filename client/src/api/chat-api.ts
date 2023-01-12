import api from './customAxios';

export const getChatRoom = async (id: string) => {
  try {
    const chatInformation = await api.get(`/chat/${id}`);
    return chatInformation.data;
  } catch (error) {
    alert('채팅방 불러오기 실패하였습니다.');
  }
};

// export const patchChatRoom = async (id: string) => {
//   try {
//     await api.patch(`/chat/${id}`);
//     return chats;
//   } catch (error) {
//     alert('채팅방 불러오기 실패하였습니다.');
//   }
// };

export const getChatRooms = async () => {
  try {
    const chatInformation = await api.get('/chat');
    return chatInformation.data;
  } catch (error) {
    alert('채팅방 목록 불러오기 실패하였습니다.');
  }
};

export async function createChatRoom(authorId: string | undefined) {
  try {
    // 서버로 post 보내기, useMutate 정의
    const postChatData = await api.post('/chat', { guest: authorId });
    return postChatData;
  } catch (error) {
    alert('채팅방 생성 실패하였습니다.');
  }
}

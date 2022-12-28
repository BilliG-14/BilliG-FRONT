import api from '../../api/customAxios';

export async function createChatRoom(authorId: string | undefined) {
  try {
    // 서버로 post 보내기, useMutate 정의
    const postChatData = await api.post('/chat', { guest: authorId });
    return postChatData;
  } catch (error) {
    alert('채팅방 생성 실패하였습니다.');
  }
}

import api from '../../api/customAxios';

export const getChatRoom = async (id: string) => {
  try {
    const chatInformation = await api.get(`/chat/${id}`);
    return chatInformation.data;
  } catch (error) {
    console.log(error);
  }
};

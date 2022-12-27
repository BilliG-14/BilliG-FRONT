import api from '../../api/customAxios';

const getChatRooms = async () => {
  try {
    const chatInformation = await api.get('/chat/');
    return chatInformation;
  } catch (error) {
    console.log(error);
  }
};

export default getChatRooms;

export type MessageType = {
  name: string;
  message: string;
};

export type ChatRoomType = {
  _id: string;
  another: {
    _id: string;
    nickName: string;
    name: string;
  };
  chats?: [];
};

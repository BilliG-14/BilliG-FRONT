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
  chats: [];
};

export type NotificationType = {
  id: string; //채팅방 id
  total: number; // 해당 채팅방의 총 메시지 개수
  lastKnownTotal: number; // 해당 채팅방에서 내가 읽은 메시지 개수
  count: number; // 알림아이콘에 표시해줄 숫자
};

import create from 'zustand';

/** 채팅방 state */
interface ChatRoomState {
  initialChatRoomState: {
    currentChatRoom: {
      id: string;
      name: string;
    };
  };
  isPrivateChatRoom: boolean;
  setCurrentChatRoom: (
    currentChatRoom: object,
    isPrivateChatRoom: boolean,
  ) => void;
  setPrivateChatRoom: (
    currentChatRoom: object,
    isPrivateChatRoom: boolean,
  ) => void;
  setUserPosts: (currentChatRoom: object, userPosts: string) => void;
}
/** 채팅방 store */
export const chatRoomStore = create<ChatRoomState>((set) => ({
  initialChatRoomState: { currentChatRoom: { id: '', name: '' } },
  isPrivateChatRoom: false,

  setCurrentChatRoom: (chatRoomData) =>
    set((state) => ({
      initialChatRoomState: {
        ...state.initialChatRoomState,
        chatRoomData,
      },
    })),

  setPrivateChatRoom: (isPrivate) =>
    set((state) => ({
      initialChatRoomState: {
        ...state.initialChatRoomState,
        isPrivateChatRoom: isPrivate,
      },
    })),

  setUserPosts: (Posts) =>
    set((state) => ({
      initialChatRoomState: {
        ...state.initialChatRoomState,
        userPosts: Posts,
      },
    })),
}));

import React, { useState, useEffect, useCallback } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatRoomType, NotificationType } from 'types/chatType';
import { UserType } from 'types/userType';
import { Socket } from 'socket.io-client';
import { getChatRoom } from 'api/chat-api';
import api from 'api/customAxios';
function ChatRoomList({
  chatRoomList,
  socket,
  user,
}: {
  chatRoomList: ChatRoomType[];
  socket: Socket;
  user: UserType;
}) {
  // url id 받기
  const { roomId } = useParams() as { roomId: string };
  // const [currentRoom, setCurrentRoom] = useState('');
  // const [aftereRoomId, setAfterRoomId] = useState<string>('');
  const [beforeRoomId, setBeforeRoomId] = useState<string>('');
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  // const [newChats, setNewChats] = useState([]);
  const [oldChats, setOldChats] = useState([]);
  //=========================================================================
  //테스트중,...1
  // const addOldMessage = useCallback(
  //   (message: [], sentRoom: string) => {
  //     if (message && user?.nickName) {
  //       socket.emit('leave-room', message, sentRoom);
  //     }
  //   },
  //   [user.nickName],
  // );
  //=========================================================================
  //테스트중,...2
  // useEffect(() => {
  //   setCurrentRoom(roomId ?? '');
  // }, [user?.nickName, roomId]);
  // useEffect(() => {
  //   try {
  //     console.log('아니 이건 되야 되는건데..?');
  //     socket.on(
  //       `leave-room${currentRoom}`,
  //       ({ room, message }: { room: any; message: any }) => {
  //         console.log('제발떠 메시지: ', message);
  //       },
  //     );
  //   } catch (error) {
  //     alert('소켓 통신이 정상적으로 이루어지지 않았습니다.');
  //   }
  // }, [currentRoom]);

  //=========================================================================
  /** 채팅방 변경 */
  const changeChatRoom = async (room: ChatRoomType) => {
    try {
      setBeforeRoomId(room._id);
      // addOldMessage(room.chats, room._id);
      const oldChatData = await getChatRoom(beforeRoomId);
      setOldChats(oldChatData.chats);
      // if (beforeRoomId) {
      //   await api.patch(`chat/${beforeRoomId}`, oldChats);
      // }
      /** 채팅방 이동 전 소켓 이벤트 삭제 */
      socket.removeAllListeners(`message${beforeRoomId}`);
    } catch (error) {
      alert('소켓 통신이 정상적으로 이루어지지 않았습니다.');
    }
    /** 현재 선택한 채팅방 정보 가져옴 */
    navigate(`/chat/${room._id}`);
  };

  /**채팅방 목록 렌더링 */
  const renderChatRooms = () =>
    chatRoomList &&
    chatRoomList.length > 0 &&
    /** chatRooms의 타입을 정해줍시다! */
    chatRoomList.map((room: ChatRoomType) => {
      //여기에 old_chats, new_chats를 비교하는 구문을 넣으세요.
      // if (newChats.length > oldChats.length) {
      //   setCount(newChats.length - oldChats.length);
      // }

      return (
        <li
          key={room._id}
          className={
            room._id === beforeRoomId
              ? 'w-full h-14 pl-1 flex items-center cursor-pointer mb-5 bg-amber-300 rounded'
              : 'w-full h-14 pl-1 flex items-center cursor-pointer mb-5'
          }
          onClick={() => {
            changeChatRoom(room);
          }}
        >
          # {room.another.nickName}님의 채팅방
          {/* <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ">
            {count}
          </span> */}
        </li>
      );
    });

  return (
    <div className="mt-5 px-2 h-[550px]">
      <div className="relative w-full flex flex-col h-[450px]">
        <div className="flex justify-start">
          <FaRegSmileWink className="h-10 w-10 text-2xl mb-2" />
        </div>
        <div className="mt-3 h-20 flex items-center">
          CHAT ROOMS ({chatRoomList?.length})
        </div>
        {/* <FaPlus
          //   onClick={handleShow}
          className="absolute right-0 cursor-pointer text-2xl "
        /> */}

        {/** 채팅방 목록 렌더링 */}
        <ul className="w-full mt-5 overflow-y-auto">{renderChatRooms()}</ul>
      </div>
    </div>
  );
}

export default ChatRoomList;

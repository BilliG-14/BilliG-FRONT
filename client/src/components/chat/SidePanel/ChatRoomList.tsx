import React, { useState } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatRoomType } from 'types/chatType';
import { Socket } from 'socket.io-client';
function ChatRoomList({
  chatRoomList,
  socket,
}: {
  chatRoomList: ChatRoomType[];
  socket: Socket;
}) {
  // url id 받기
  const { roomId } = useParams();
  const [activeChatRoomId, setActiveChatRoomId]: any = useState(roomId);
  const navigate = useNavigate();

  /** 채팅방 변경 */
  const changeChatRoom = (room: any) => {
    try {
      /** 채팅방 이동 전 소켓 이벤트 삭제 */
      socket.removeAllListeners(`message${activeChatRoomId}`);
    } catch (error) {
      alert('소켓 통신이 정상적으로 이루어지지 않았습니다.');
    }
    /** 현재 선택한 채팅방 정보 가져옴 */
    setActiveChatRoomId(room._id);

    navigate(`/chat/${room._id}`);
  };

  /**채팅방 목록 렌더링 */
  const renderChatRooms = () =>
    chatRoomList &&
    chatRoomList.length > 0 &&
    /** chatRooms의 타입을 정해줍시다! */
    chatRoomList.map((room: any) => (
      <li
        key={room._id}
        className={
          room._id === activeChatRoomId
            ? 'w-full h-14 pl-1 flex items-center cursor-pointer mb-5 bg-amber-300 rounded dark:bg-b-dark-yellow'
            : 'w-full h-14 pl-1 flex items-center cursor-pointer mb-5'
        }
        onClick={() => changeChatRoom(room)}
      >
        # {room.another.nickName}님의 채팅방
        {/* <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ">
          채팅 알림 아이콘
           {getNotificationCount(room)}
        </span> */}
      </li>
    ));
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

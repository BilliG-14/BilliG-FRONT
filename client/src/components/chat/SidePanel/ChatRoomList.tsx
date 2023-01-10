import React, { useState, useEffect } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatRoomType, NotificationType } from 'types/chatType';
import { Socket } from 'socket.io-client';
import { getChatRoom } from 'api/chat-api';
import api from 'api/customAxios';
function ChatRoomList({
  chatRoomList,
  socket,
}: {
  chatRoomList: ChatRoomType[];
  socket: Socket;
}) {
  // url id 받기
  const { roomId } = useParams() as { roomId: string };
  const [aftereRoomId, setAfterRoomId] = useState<string>('');
  const [beforeRoomId, setBeforeRoomId] = useState<string>('');
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [newChats, setNewChats] = useState([]);
  const [oldChats, setOldChats] = useState([]);
  // const [notifications, setNotifications] = useState<NotificationType[]>([]);
  /** 채팅방 변경 */
  const changeChatRoom = async (room: ChatRoomType) => {
    try {
      setBeforeRoomId(room._id);
      const oldChatData = await getChatRoom(beforeRoomId);
      setOldChats(oldChatData.chats);
      if (beforeRoomId) {
        await api.patch(`chat/${beforeRoomId}`, oldChats);
      }
      console.log('room', room);
      /** 채팅방 이동 전 소켓 이벤트 삭제 */
      socket.emit('leave', room._id);
      socket.removeAllListeners(`message${beforeRoomId}`);
    } catch (error) {
      alert('소켓 통신이 정상적으로 이루어지지 않았습니다.');
    }
    /** 현재 선택한 채팅방 정보 가져옴 */
    navigate(`/chat/${room._id}`);
  };

  const handleNewChats = async (room: ChatRoomType) => {
    // const newChatData = await getChatRoom(room._id);
    // setNewChats(newChatData.chats);
    // console.log('newChatData: ', newChatData);
    // console.log('newChatData: ', newChatData.chats);
    // console.log('oldChats: ', newChatData.old_chats);
    // if (newChats.length !== oldChats.length) {
    //   setCount(newChats.length - oldChats.length);
    // }
    // if (room) {
    // console.log('beforeRoomId :', beforeRoomId);
    // console.log('roomId :', room._id);
    // const newChatData = await getChatRoom(room._id); //이것이 현재 룸 아이디
    // setNewChats(newChatData.chats);
    // console.log('oldChats : ', oldChats.length);
    // console.log('newChats : ', newChats.length);
    // setAfterRoomId(roomId);
    // console.log('aftereRoomId :', aftereRoomId);
    // }
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
            handleNewChats(room);
          }}
        >
          # {room.another.nickName}님의 채팅방
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ">
            {count}
          </span>
        </li>
      );
    });
  //여기서부터 채팅방 알림 ------------------------------------------------------------------
  // 채팅방 메시지 가져오는 부분(getChatRoom)
  //--------------------------------------------------
  // useEffect(() => {
  //   async function fetchData() {
  //     //여기서 챗룸 id가 변경될 경우에 old_chats를 PATCH 요청하세요.

  //   }
  //   fetchData();
  // }, [roomId]);
  //--------------------------------------------------
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

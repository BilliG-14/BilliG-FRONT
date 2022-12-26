import React, { useState, useEffect } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

// interface ChatMessageType {
//   message?: string;
//   sender?: string;
// }

// interface ChatRoomType {
//   _id: string;
//   another: {
//     _id: string;
//     nickName: string;
//     name: string;
//   };
//   chats: [ChatMessageType];
// }

// const sampleChatRooms = {
//   _id: '123456',
//   users: {
//     _id: 'noyeah',
//     nickName: '노예',
//     name: '손병진',
//   },
//   title: '임시채팅방',
//   messages: [{ message: '임시메시지', sender: '규리' }],
// };
// let sampleChatArray = [];
// sampleChatArray.push(sampleChatRooms);
function ChatRoomList() {
  //   const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  //   const [activeChatRoomId, setActiveChatRoomId] = useState('');
  //   useEffect(() => {
  //     setChatRooms(sampleChatArray);
  //   }, []);
  //   /** 채팅방 변경 */
  //   const changeChatRoom = (room) => {
  //     /** 현재 선택한 채팅방 정보 가져옴 */
  //     chatRoomStore.setCurrentChatRoom(room);
  //     setActiveChatRoomId(room.id);
  //   };
  //   /**채팅방 목록 렌더링 */
  //   const renderChatRooms = (chatRooms) =>
  //     chatRooms.length > 0 &&
  //     /** chatRooms의 타입을 정해줍시다! */
  //     chatRooms.map((room: any) => (
  //       <li
  //         key={room.id}
  //         className={room.id === activeChatRoomId ? 'bg-orange-200' : 'bg-white'}
  //         onClick={() => changeChatRoom(room)}
  //       >
  //         # {room.name}
  //         <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ">
  //           {/* 채팅 알림 아이콘 */}
  //           {/* {getNotificationCount(room)} */}
  //         </span>
  //       </li>
  //     ));
  return (
    <div className="mt-5 px-2">
      <div className="relative w-full flex flex-col">
        <FaRegSmileWink className="mr-3 text-2xl mb-2" />
        CHAT ROOMS
        {/* ({chatRooms.length}) */}
        <FaPlus
          //   onClick={handleShow}
          className="absolute right-0 cursor-pointer text-2xl"
        />
        {/** 채팅방 목록 렌더링 */}
        <ul className="mt-2 list-none p-0">
          <li className="mt-2">엉터리생고기님의 대화방</li>
          <li className="mt-2">낙지마당님의 대화방</li>
          <li className="mt-2">달려라메시님의 대화방</li>
          <li className="mt-2">주님의 대화방</li>
        </ul>
        {/* <ul className="list-none p-0">{renderChatRooms(chatRooms)}</ul> */}
      </div>
    </div>
  );
}

export default ChatRoomList;

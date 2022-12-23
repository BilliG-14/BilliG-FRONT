import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  getDatabase,
  ref,
  onValue,
  remove,
  child,
  update,
} from 'firebase/database';

import { chatRoomStore } from '../../../store/ChatStore';
import getUserInfo from '../getUserInfo';

function MessageHeader({ handleSearchChange }) {
  const { userInfo } = getUserInfo;

  // store에서 불러오기
  const { initialChatRoomState, isPrivateChatRoom } = chatRoomStore();

  const currentchatRoom = initialChatRoomState.currentChatRoom;
  const userData = userInfo.data;
  const chatRoom = currentchatRoom;
  const isPrivateRoom = isPrivateChatRoom;
  const [isFavorited, setIsFavorited] = useState(false);
  const usersRef = ref(getDatabase(), 'users');
  const user = userData;
  const userPosts = initialChatRoomState.currentChatRoom.userPosts;

  /** 새로고침해도 좋아요 남아있게하기 */
  const addFavoriteListener = (chatRoomId, userId) => {
    onValue(child(usersRef, `${userId}/favorited`), (data) => {
      if (data.val() !== null) {
        const chatRoomIds = Object.keys(data.val());
        const isAlreadyFavorited = chatRoomIds.includes(chatRoomId);
        setIsFavorited(isAlreadyFavorited);
      }
    });
  };
  useEffect(() => {
    if (chatRoom && user) {
      addFavoriteListener(chatRoom.id, user.uid);
    }
  }, []);

  const handleFavorite = () => {
    if (isFavorited) {
      setIsFavorited((prev) => !prev); /**버튼 토글 */
      /**채팅방 아이디가 이미 favorited 테이블에 존재하면 데이터 삭제! */
      remove(child(usersRef, `${user.uid}/favorited/${chatRoom.id}`));
    } else {
      setIsFavorited((prev) => !prev); /**버튼 토글 */
      update(child(usersRef, `${user.uid}/favorited`), {
        /**채팅방 아이디가 favorited 테이블에 없으면 아래 형식으로 데이터 삽입! */
        [chatRoom.id]: {
          name: chatRoom.name,
          description: chatRoom.description,
          createdBy: {
            name: chatRoom.createdBy.name,
            image: chatRoom.createdBy.image,
          },
        },
      });
    }
  };
  /** 메시지 전송 개수 보여줌, 가장 많이 전송한 순서대로 정렬 */
  const renderUserPosts = (userPosts) =>
    Object.entries(userPosts)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([key, val], i) => (
        <div key={i} className="flex">
          <img
            width={48}
            height={48}
            className="mr-3 rounded-3xl"
            src={val.image}
            alt={val.name}
          />
          <div>
            <h6>{key}</h6>
            <p>{val.count} 개</p>
          </div>
        </div>
      ));

  return (
    <div className="w-full h-190 border-solid border-slate-200 outline-2 p-4 mb-4">
      <div className="container">
        <div className="grid-rows-1">
          <div className="grid-cols-1">
            <h2>
              {isPrivateRoom ? (
                <FaLock className="mb-10" />
              ) : (
                <FaLockOpen className="mb-10" />
              )}

              {chatRoom && chatRoom.name}
              {/**  오픈채팅방에서만 즐겨찾기 기능 돌아가게 설정함, 일대일 채팅에서 즐겨찾기 기능 쓰려면
               아래의 if문을 변경해줘야함.    */}
              {!isPrivateRoom && (
                <span className="cursor-pointer" onClick={handleFavorite}>
                  {isFavorited ? (
                    <MdFavorite className="mb-10" />
                  ) : (
                    <MdFavoriteBorder className="mb-10" />
                  )}
                </span>
              )}
            </h2>
          </div>

          <div className="grid-cols-1">
            <div className="mb-3">
              <input
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="basic-addon1"
              >
                <AiOutlineSearch />
              </input>
              <div
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={handleSearchChange}
                placeholder="Search Messages"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>

        {!isPrivateRoom && (
          <div className="flex justify-end">
            <p>
              <img
                src={chatRoom && chatRoom.createdBy.image}
                roundedCircle
                className="w-30 h-30"
                alt="프로필 이미지"
              />{' '}
              {chatRoom && chatRoom.createdBy.name}
            </p>
          </div>
        )}

        <div className="grid-rows-1">
          <div className="grid-cols-1">
            <div className="accordion">
              <div
                className="accordion-item bg-white border border-gray-200"
                eventKey="0"
              >
                <h2 className="accordion-header mb-0">Description</h2>
                <button
                  className=" accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                  eventKey="0"
                >
                  <div className="accordion-body py-4 px-5">
                    {chatRoom && chatRoom.description}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="grid-cols-1">
            <div className="accordion">
              <div
                className="accordion-item bg-white border border-gray-200"
                eventKey="0"
              >
                <h2 className="accordion-header mb-0">Description</h2>
                <button
                  className=" accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
                  eventKey="0"
                >
                  <div className="accordion-body py-4 px-5">
                    {userPosts && renderUserPosts(userPosts)}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;

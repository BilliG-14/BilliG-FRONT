import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChatRoom } from '../getChatRoom';
interface MessageInterface {
  name: string;
  message: string;
}

function MainPanel({ user, chatRoomList, socket }: any) {
  const scrollRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);
  // url id 받기
  const { roomId } = useParams();
  const sendMessage = useCallback(
    (message: string, sentRoom: string) => {
      if (message && user?.nickName) {
        socket.emit('send', sentRoom, user.nickName, message);
      }
    },
    [user?.nickName],
  );
  useEffect(() => {
    setCurrentRoom(roomId ?? '');
  }, [user?.nickName, roomId]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textRef?.current?.value) {
      sendMessage(textRef.current.value, currentRoom);
    }
    formRef?.current?.reset();
  };

  useEffect(() => {
    socket.on(
      `message${currentRoom}`,
      ({ name, message }: { name: string; message: string }) => {
        setMessages([...messages, { name, message }]);
      },
    );
    // socket.on('users', (room: any) => {
    //   setUsers(room);
    // });
  }, [currentRoom, messages]);
  //--------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      if (roomId) {
        const chatData = await getChatRoom(roomId);
        const chatMessages = chatData.chats;
        setMessages(chatMessages);
      }
    }
    fetchData();
  }, [roomId]);
  //--------------------------------------------------
  useEffect(() => {
    if (scrollRef) scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full w-full outline outline-1 outline-gray-200 relative rounded-r-lg">
      {currentRoom ? (
        <div className="h-full w-full ">
          <div className="bg-[#75BC89] w-full h-[800px] p-4 overflow-y-scroll">
            {messages.map(({ name, message }, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    user?.nickName === name
                      ? 'my-4 w-full h-16 chat chat-end chat-header flex flex-col items-end justify-center'
                      : 'my-4 w-full h-16 chat chat-start chat-header flex flex-col items-start justify-center'
                  }
                >
                  {name}
                  <div className="my-2 text-sm text-black bg-amber-200 p-2 chat-bubble">
                    {message}
                    {/**  스크롤이 내려갈 자리*/}
                    <div ref={scrollRef} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-b-bg-gray h-[100px] w-full">
            <form
              ref={formRef}
              className=" w-full h-full inputform p-8 pt-5"
              onSubmit={onSubmit}
            >
              <input
                ref={textRef}
                className="w-11/12 h-[30px] textInput outline outline-1 outline-slate-200 rounded-3xl p-2 pl-5"
                type="text"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-1/2 flex flex-col items-center justify-center pt-20 absolute top-20">
          <img
            className="w-2/5 mb-20 opacity-50"
            src="/img/step2.png"
            alt="채팅방 기본 이미지"
          />
          <div className="text-lg text-gray-800 font-medium">
            표시할 대화가 없습니다. 채팅방을 선택해주세요!
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPanel;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
interface MessageInterface {
  sender: string;
  message: string;
}

const socket = io('http://34.64.44.34:3003/chat', {
  transports: ['websocket'],
});
const baseURL = 'http://34.64.44.34:3003/';

function MainPanel({ user }: any) {
  const scrollRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = useCallback(
    (message: string, sentRoom: string) => {
      if (message && user?.nickName) {
        socket.emit('send', sentRoom, user.nickName, message);
      }
    },
    [user?.nickName],
  );
  useEffect(() => {
    setCurrentRoom('1227');
  }, [user?.nickName]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textRef?.current?.value) {
      sendMessage(textRef.current.value, currentRoom);
    }
    formRef?.current?.reset();
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  });
  useEffect(() => {
    socket.on(
      `message${currentRoom}`,
      ({ name, message }: { name: string; message: string }) => {
        console.log('들가기전 .. messages: ', messages);
        setMessages([...messages, { sender: name, message }]);
        console.log('들가고후 .. messages: ', messages);
      },
    );

    // socket.on('users', (room: any) => {
    //   setUsers(room);
    // });
  }, [currentRoom, messages]);
  //--------------------------------------------------
  //   const [myChatList, setMyChatList] = useState<MyChatListType[]>([]);
  // useEffect(() => {
  //   if (myChatList) {
  //     myChatList.forEach((room) => {
  //       if (room.title === currentRoom) {
  //         setMessages(room.messages);
  //       }
  //     });
  //   }
  // }, [currentRoom, myChatList]);

  // useEffect(() => {
  //   if (message) {
  //     if (currentRoom === message.sentRoom) {
  //       setMessages((messages) => {
  //         const newmsg = { sender: message.sender, message: message.message };
  //         return [...messages, newmsg];
  //       });
  //     }
  //   }
  // }, [message, currentRoom]);
  //--------------------------------------------------

  return (
    <div className="pr-10 h-full w-full">
      {currentRoom ? (
        <div className="h-full w-full ">
          <div className="bg-white w-full h-4/5 border-solid outline-2 border-slate-200 rounded p-4 overflow-auto">
            {messages.map(({ sender, message }, idx) => {
              return (
                <div
                  key={idx}
                  className="my-4 w-full h-16 chat chat-end chat-header flex flex-col items-end justify-center"
                >
                  {sender}
                  <div className="my-2 text-sm text-black bg-amber-200 p-2 chat-bubble">
                    {message}
                  </div>
                </div>
              );
            })}
            {/**  스크롤이 내려갈 자리*/}
            <div ref={scrollRef} />
          </div>

          <div className="bg-b-bg-gray h-1/5 w-full">
            <form
              ref={formRef}
              className=" w-full h-full inputform p-8 pt-2"
              onSubmit={onSubmit}
            >
              <input
                ref={textRef}
                className="w-11/12 h-1/5 textInput outline outline-1 outline-slate-200 rounded-3xl p-2 pl-5"
                type="text"
              />
            </form>
          </div>
        </div>
      ) : (
        <div>표시할 대화가 없습니다.</div>
      )}
    </div>
  );
}

export default MainPanel;

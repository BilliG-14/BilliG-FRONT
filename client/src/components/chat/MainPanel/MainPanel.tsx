import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getChatRoom } from 'api/chat-api';
import { MessageType } from 'types/chatType';
import { UserType } from 'types/userType';
import { Socket } from 'socket.io-client';
function MainPanel({ user, socket }: { user: UserType; socket: Socket }) {
  const scrollRef = useRef<HTMLInputElement>(null);
  const inputOpenImageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  /** 줄 수를 계산해서 저장할 변수*/
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
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
    setIsSubmit(true);
    onSubmitButton();
  };
  const onSubmitButton = () => {
    if (textRef?.current?.value) {
      sendMessage(textRef.current.value, currentRoom);
      setIsSubmit(false);
    }

    formRef?.current?.reset();
  };
  useEffect(() => {
    try {
      socket.on(
        `message${currentRoom}`,
        ({ name, message }: { name: string; message: string }) => {
          setMessages([...messages, { name, message }]);
        },
      );
    } catch (error) {
      alert('소켓 통신이 정상적으로 이루어지지 않았습니다.');
    }
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

  /** shift + Enter 줄바꿈 */
  const pressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      // isComposing 이 true 이면
      return; // 조합 중이므로 동작을 막는다.
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitButton();
    }
  };
  /** 줄바꿈에 따른 textArea 높이 자동 조절
   사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
   엔터('\n') 개수를 세서 textareaHeight에 저장*/
  const checkItemChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const arrayLength = e.target.value.split('\n').length;
    if (arrayLength < 4) {
      setTextareaHeight(arrayLength - 1);
    }
  };

  /**이미지 업로드 */
  const handleOpenImageRef = () => {
    inputOpenImageRef?.current?.click();
  };
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files[0];
    // console.log(e.target.files[0]);
  };

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
                      ? 'my-2 w-full p-1 h-auto chat chat-end chat-header flex flex-col items-end justify-center'
                      : 'my-2 w-full p-1 h-auto chat chat-start chat-header flex flex-col items-start justify-center'
                  }
                >
                  {name}
                  <div className="my-2 text-sm text-black bg-amber-200 p-2 chat-bubble break-all whitespace-pre-line">
                    {message}
                    {/**  스크롤이 내려갈 자리*/}
                    <div ref={scrollRef} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-b-bg-gray h-[120px] w-full">
            <form
              ref={formRef}
              className=" w-full h-full inputform p-8 pt-5"
              onSubmit={onSubmit}
            >
              <div className="flex items-center">
                <textarea
                  ref={textRef}
                  className="w-11/12 h-[30px] textInput outline outline-1 outline-slate-200 rounded-3xl p-2 pl-5 resize-none"
                  // type="text"
                  onKeyDown={pressEnter}
                  onChange={checkItemChangeHandler}
                  style={{ height: (textareaHeight + 1) * 27 + 'px' }}
                  value={isSubmit ? '' : undefined}
                  placeholder="메시지를 입력하세요"
                />
                <button
                  type="submit"
                  onClick={() => onSubmitButton}
                  className="w-20 inline-block ml-4 px-2 py-2 border-2 border-gray-400 text-gray-400 text-base leading-tight rounded-full hover:bg-black hover:text-gray-800 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  전송
                </button>
                <button
                  onClick={handleOpenImageRef}
                  className="message-form-button"
                  style={{ width: '100%' }}
                >
                  UPLOAD
                </button>
                <input
                  accept="image/jpeg, image/png"
                  style={{ display: 'none' }}
                  type="file"
                  ref={inputOpenImageRef}
                  onChange={handleUploadImage}
                />
              </div>
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

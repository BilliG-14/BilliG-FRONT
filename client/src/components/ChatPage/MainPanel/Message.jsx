import React from 'react';
import moment from 'moment';

function Message({ message, user }) {
  /** 현재 시각 기준으로 메시지 전송 시각을 표시해줌 */
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const isImage = (message) => {
    return (
      /** message 안에 image라는 프로퍼티가 있고, content라는 프로퍼티가 없는지 확인 */
      message.hasOwnProperty('image') && !message.hasOwnProperty('content')
    );
  };
  const isMessageMine = (message, user) => {
    //이건 뭐지; 보류
    if (user) {
      return message.user.id === user.uid;
    }
  };

  return (
    <div className="mb-3 flex">
      <img
        width={48}
        height={48}
        className="mr-3 rounded-lg"
        src={message.user.image} /**message 테이블의 user 컬럼 데이터 */
        alt={message.user.name} /**message 테이블의 user 컬럼 데이터 */
      />
      <div /**message와 message 보낸 사람 정보 */
        style={{
          /** 채팅 메시지가 내가 보낸 메시지인지 아닌지 확인 후 스타일 변경 */
          backgroundColor: isMessageMine(message, user) && '#ECECEC',
        }}
      >
        <h6>
          {message.user.name}{' '}
          <span className="text-xs text-slate-400">
            {timeFromNow(message.timestamp)}
          </span>
        </h6>
        {isImage(message) ? (
          <img className="max-w-xs" alt="이미지" src={message.image} />
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default Message;

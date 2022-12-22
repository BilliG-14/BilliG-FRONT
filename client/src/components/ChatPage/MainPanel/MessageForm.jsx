import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getDatabase, ref, set, remove, push, child } from 'firebase/database';
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { chatRoomStore } from '../../../store/ChatStore';
import getUserInfo from '../getUserInfo';

function MessageForm() {
  /** 리덕스 store에 chatRoom 정보가 들어있음.  */
  const { userInfo } = getUserInfo;

  // store에서 불러오기
  const { initialChatRoomState, isPrivateChatRoom } = chatRoomStore();

  const chatRoom = initialChatRoomState.currentChatRoom;
  const user = userInfo.data;
  /**  채팅창에 입력할 내용 */
  const [content, setContent] = useState('');
  /**  에러 처리 */
  const [errors, setErrors] = useState([]);
  /**  send 동작 이후에 다시 못누르도록 설정 */
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  /**  messages 테이블에 데이터 저장할 주소 */
  const messagesRef = ref(getDatabase(), 'messages');
  /**  프로필 사진 변경하기랑 같은 원리로 사용함 */
  const inputOpenImageRef = useRef();
  const typingRef = ref(getDatabase(), 'typing');
  const isPrivateRoom = isPrivateChatRoom;
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: new Date(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };

    if (fileUrl !== null) {
      /**  message 테이블의 image 컬럼에 파일 url 추가 */
      message.user.image = fileUrl;
    } else {
      /**  message 테이블의 content 컬럼에 채팅 내용 추가 */
      message.content = content;
    }

    return message;
  };

  const handleSubmit = async () => {
    if (!content) {
      setErrors((prev) => prev.concat('Type contents first'));
      return;
    }
    setLoading(true);
    /** firebase에 메시지를 저장하는 부분 */
    try {
      await set(push(child(messagesRef, chatRoom.id)), createMessage());
      /**  createMessage 함수에서 반환되는 message 값을 messages 테이블에 채팅방 id 값과 함께 저장함. */
      await remove(child(typingRef, `${chatRoom.id}/${user.uid}`));
      setLoading(false);
      setContent('');
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const getPath = () => {
    if (isPrivateRoom) {
      return `/message/private/${chatRoom.id}`;
    } else {
      return `/message/public`;
    }
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const storage = getStorage();

    const filePath = `${getPath()}/${file.name}`;
    console.log('filePath', filePath);
    const metadata = { contentType: file.type };
    setLoading(true);
    try {
      /**  파일을 먼저 스토리지에 저장  */
      const storageRef = strRef(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            /**  파일 저장되는 퍼센티지 구하기 */
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercentage(progress);
          console.log('Upload is ' + percentage + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
            default:
              break;
          }
        },
        () => {
          /**  저장이 다 된 후에 파일 메시지 전송(데이터베이스에 저장) */
          /**  저장된 파일을 다운로드 받을 수 있는 URL 가져오기 */
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            set(
              /** message 테이블의 각 채팅룸 id에 저장 */
              push(child(messagesRef, chatRoom.id)),
              createMessage(downloadURL),
            );
            setLoading(false);
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      /**  Ctrl + Enter 로 메시지 전송 */
      handleSubmit();
    }

    const userUid = user.uid;
    if (content) {
      set(ref(getDatabase(), `typing/${chatRoom.id}/${user.uid}`), {
        userUid: user.displayName,
      });
    } else {
      remove(ref(getDatabase(), `typing/${chatRoom.id}/${user.uid}`));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            onKeyDown={handleKeyDown}
            value={content}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>
      {!(percentage === 0 || percentage === 100) && (
        <ProgressBar
          variant="warning"
          label={`${percentage}%`}
          now={percentage}
        />
      )}
      <div>
        {errors.map((errorMsg) => (
          <p className="text-red-600" key={errorMsg}>
            {errorMsg}
          </p>
        ))}
      </div>
      <Row>
        <Col>
          <button
            onClick={handleSubmit}
            className="message-form-button w-full"
            disabled={loading ? true : false}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button
            onClick={handleOpenImageRef}
            className="message-form-button w-full"
            disabled={loading ? true : false}
          >
            UPLOAD
          </button>
        </Col>
      </Row>
      <input
        accept="image/jpeg, image/png"
        className="hidden"
        type="file"
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default MessageForm;

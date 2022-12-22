import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaLock } from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import {
  getDatabase,
  ref,
  onValue,
  remove,
  child,
  update,
} from 'firebase/database';

function MessageHeader({ handleSearchChange }) {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const isPrivateChatRoom = useSelector(
    (state) => state.chatRoom.isPrivateChatRoom,
  );
  const [isFavorited, setIsFavorited] = useState(false);
  const usersRef = ref(getDatabase(), 'users');
  const user = useSelector((state) => state.user.currentUser);
  const userPosts = useSelector((state) => state.chatRoom.userPosts);
  useEffect(() => {
    if (chatRoom && user) {
      addFavoriteListener(chatRoom.id, user.uid);
    }
  }, []);

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
      <Container>
        <Row>
          <Col>
            <h2>
              {isPrivateChatRoom ? (
                <FaLock className="mb-10" />
              ) : (
                <FaLockOpen className="mb-10" />
              )}

              {chatRoom && chatRoom.name}
              {/**  오픈채팅방에서만 즐겨찾기 기능 돌아가게 설정함, 일대일 채팅에서 즐겨찾기 기능 쓰려면
               아래의 if문을 변경해줘야함.    */}
              {!isPrivateChatRoom && (
                <span className="cursor-pointer" onClick={handleFavorite}>
                  {isFavorited ? (
                    <MdFavorite className="mb-10" />
                  ) : (
                    <MdFavoriteBorder className="mb-10" />
                  )}
                </span>
              )}
            </h2>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>
              <FormControl
                onChange={handleSearchChange}
                placeholder="Search Messages"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>

        {!isPrivateChatRoom && (
          <div className="flex justify-end">
            <p>
              <Image
                src={chatRoom && chatRoom.createdBy.image}
                roundedCircle
                className="w-30 h-30"
              />{' '}
              {chatRoom && chatRoom.createdBy.name}
            </p>
          </div>
        )}

        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{chatRoom && chatRoom.description}</Card.Body>
                </Accordion.Collapse>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Posts Count</Accordion.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {userPosts && renderUserPosts(userPosts)}
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MessageHeader;

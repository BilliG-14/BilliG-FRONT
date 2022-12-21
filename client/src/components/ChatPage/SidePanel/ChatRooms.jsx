import React, { Component } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from '../../../redux/actions/chatRoom_action';
import {
  getDatabase,
  ref,
  onChildAdded,
  onValue,
  push,
  child,
  update,
  off,
} from 'firebase/database';

export class ChatRooms extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: ref(getDatabase(), 'chatRooms'),
    messagesRef: ref(getDatabase(), 'messages'),
    chatRooms: [], //채팅방 목록 state 선언
    firstLoad: true,
    activeChatRoomId: '',
    notifications: [],
  };

  componentDidMount() {
    this.AddChatRoomsListeners();
  }

  componentWillUnmount() {
    off(this.state.chatRoomsRef);
    this.state.chatRooms.forEach((chatRoom) => {
      off(this.state.messagesRef.child(chatRoom.id));
    });
  }

  setFirstChatRoom = () => {
    const firstChatRoom = this.state.chatRooms[0];
    if (this.state.firstLoad && this.state.chatRooms.length > 0) {
      // 현재 채팅방 중 0번째 인덱스에 있는 채팅방 정보 가져옴
      this.props.dispatch(setCurrentChatRoom(firstChatRoom));
      this.setState({ activeChatRoomId: firstChatRoom.id });
    }
    this.setState({ firstLoad: false }); // firstLoad 상태값 false로 setState
  };

  AddChatRoomsListeners = () => {
    // 채팅방 목록을 담을 빈 배열 선언
    let chatRoomsArray = [];

    // 채팅방 목록 배열에 생성한 채팅방 push
    onChildAdded(this.state.chatRoomsRef, (DataSnapshot) => {
      //DataSnapshot안에 채팅방id 포함 (DataSnapshot.key === 채팅방 id)
      chatRoomsArray.push(DataSnapshot.val());
      // 채팅방 목록 을 push 한 배열로 setState
      this.setState({ chatRooms: chatRoomsArray }, () =>
        // 아무것도 선택하지 않았을 때, default값으로 0번째 인덱스에 저장된 채팅방이 보여지도록 채팅방 정보 불러옴
        this.setFirstChatRoom(),
      );
      // 채팅방 알림 기능
      this.addNotificationListener(DataSnapshot.key); // 채팅방 목록 을 push 한 배열로 setState
    });
  };

  addNotificationListener = (chatRoomId) => {
    let { messagesRef } = this.state;
    onValue(child(messagesRef, chatRoomId), (DataSnapshot) => {
      if (this.props.chatRoom) {
        // 리덕스 store에서 가져옴.(mapStateToProps)
        this.handleNotification(
          chatRoomId,
          this.props.chatRoom.id,
          this.state.notifications,
          DataSnapshot,
        );
      }
    });
  };

  //채팅방 알림 기능 구현
  handleNotification = (
    //chatRoomId는 1개가 아니라 채팅방 개수만큼 존재한다.
    chatRoomId,
    // 현재 채팅방 아이디
    currentChatRoomId,
    //알림 정보가 들어갈 배열
    notifications,
    // chatRoomId에 관한 정보
    DataSnapshot,
  ) => {
    let lastTotal = 0;

    // 이미 notifications state 안에 알림 정보가 들어있는 채팅방과 그렇지 않은 채팅방을 나눠주기
    let index = notifications.findIndex(
      // findIndex: 배열에서 조건을 만족하는 첫번째 원소의 인덱스 값을 반환하며 만족하는 원소가 없을 경우 -1을 반환
      (notification) => notification.id === chatRoomId,
    );

    //notifications state 안에 해당 채팅방의 알림 정보가 없을 때
    if (index === -1) {
      notifications.push({
        id: chatRoomId, //채팅방 id
        total: DataSnapshot.size, // 해당 채팅방의 총 메시지 개수
        lastKnownTotal: DataSnapshot.size, // 해당 채팅방에서 내가 읽은 메시지 개수
        count: 0, // 알림아이콘에 표시해줄 숫자
      });
    }
    // 이미 해당 채팅방의 알림 정보가 있을 떄
    else {
      //상대방이 채팅 보내는 그 해당 채팅방에 있지 않을 때
      if (chatRoomId !== currentChatRoomId) {
        //현재까지 유저가 확인한 총 메시지 개수
        lastTotal = notifications[index].lastKnownTotal;

        //count (알림으로 보여줄 숫자)를 구하기
        //현재 총 메시지 개수 - 이전에 확인한 총 메시지 개수 > 0
        //현재 총 메시지 개수가 10개이고 이전에 확인한 메시지가 8개 였다면 2개를 알림으로 보여줘야함.
        if (DataSnapshot.size - lastTotal > 0) {
          notifications[index].count = DataSnapshot.size - lastTotal;
        }
      }
      //total property에 현재 전체 메시지 개수를 넣어주기
      notifications[index].total = DataSnapshot.size;
    }
    //목표는 방 하나 하나의 맞는 알림 정보를 notifications state에  넣어주기
    this.setState({ notifications });
  };

  // 채팅방 알림 숫자
  getNotificationCount = (room) => {
    //해당 채팅방의 count수를 구하는 중입니다.
    let count = 0;

    this.state.notifications.forEach((notification) => {
      if (notification.id === room.id) {
        count = notification.count;
      }
    });
    if (count > 0) return count;
  };

  //채팅방 클릭 시 알림 초기화
  clearNotificaions = () => {
    let index = this.state.notifications.findIndex(
      (notification) => notification.id === this.chatRoom.id,
    );
    if (index !== -1) {
      let updatedNotifications = [...this.state.notifications];
      updatedNotifications[index].lastKnownTotal =
        this.state.notifications[index].total;
      updatedNotifications[index].count = 0;
      this.setState({ notifications: updatedNotifications });
    }
  };
  // 채팅방 만들기 모달 창 닫기
  handleClose = () => this.setState({ show: false });
  // 채팅방 만들기 모달 창 열기
  handleShow = () => this.setState({ show: true });
  // 채팅방 만들기 모달 창 생성하기 누르면 동작
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  };

  addChatRoom = async () => {
    const key = push(this.state.chatRoomsRef).key;
    const { name, description } = this.state;
    const { user } = this.props;
    const newChatRoom = {
      id: key, // 데이터베이스 테이블 아래에 들어갈 id이자, 데이터의 id이기도 함.
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };

    try {
      // 데이터베이스의 "chatRooms" 테이블에 key와 newChatRoom 객체 value를 추가한다.
      await update(child(this.state.chatRoomsRef, key), newChatRoom);
      this.setState({
        name: '',
        description: '',
        show: false,
      });
    } catch (error) {
      alert(error);
    }
  };

  isFormValid = (name, description) => name && description;

  // 채팅방 변경
  changeChatRoom = (room) => {
    // 현재 선택한 채팅방 정보 가져옴
    this.props.dispatch(setCurrentChatRoom(room));
    this.props.dispatch(setPrivateChatRoom(false));
    this.setState({ activeChatRoomId: room.id });
  };

  //채팅방 목록 렌더링
  renderChatRooms = (chatRooms) =>
    chatRooms.length > 0 &&
    chatRooms.map((room) => (
      <li
        key={room.id}
        style={{
          backgroundColor:
            room.id === this.state.activeChatRoomId && '#ffffff45',
        }}
        onClick={() => this.changeChatRoom(room)}
      >
        # {room.name}
        <Badge className="float-right mt-4 " variant="danger">
          {this.getNotificationCount(room)}
        </Badge>
      </li>
    ));

  render() {
    return (
      <div>
        <div className="relative w-full flex items-center">
          <FaRegSmileWink className="mr-3" />
          CHAT ROOMS ({this.state.chatRooms.length})
          <FaPlus
            onClick={this.handleShow}
            className="absolute right-0 cursor-pointer"
          />
        </div>

        {/* 채팅방 목록 렌더링 */}
        <ul className="list-none p-0">
          {this.renderChatRooms(this.state.chatRooms)}
        </ul>

        {/* ADD CHAT ROOM MODAL */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a chat room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>방 이름</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room name"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>방 설명</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  type="text"
                  placeholder="Enter a chat room description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    chatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(ChatRooms);

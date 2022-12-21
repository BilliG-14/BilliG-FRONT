import React, { Component } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from '../../../redux/actions/chatRoom_action';
import { getDatabase, ref, onChildAdded } from 'firebase/database';

export class DirectMessages extends Component {
  state = {
    usersRef: ref(getDatabase(), 'users'),
    users: [],
    activeChatRoom: '',
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUsersListeners(this.props.user.uid);
    }
  }

  addUsersListeners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];

    onChildAdded(usersRef, (DataSnapshot) => {
      if (currentUserId !== DataSnapshot.key) {
        // 현재 로그인한 나의 아이디와 다른 아이디일때
        let user = DataSnapshot.val();
        user['uid'] = DataSnapshot.key;
        user['status'] = 'offline';
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid; //currentUserId: 현재 로그인한 나의 아이디(리덕스에서 props로 가져온 아이디)

    return userId > currentUserId // 상대방의 아이디(currentUserId)와 내 아이디(userId)를 비교할때 내가 구한 값이나 상대방이 구한값이나 같아야하므로 이렇게 구현함. 예시) 내 아이디가 1234, 상대방 아이디가 5678일때 나의 입장에서 이 로직은 1234가 5678보다 작으므로 false일때의 반환값인 5678/1234가 반환될 것이고, 상대방의 입장에서 이로직은 5678이 1234보다 크므로 true일때의 반환값인 5678/1234가 반환될 것이다. 그렇게 되면 나와 상대방의 반환값이 같으므로 둘만의 대화방id는 오직 1개만 생기게 된다.
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };
  //currentChatRoom을 클릭한 방으로 변경
  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid); //상대방의 uid
    const chatRoomData = {
      id: chatRoomId, // getChatRoomId에서 만들어 반환해준 나와 상대방만의 채팅방 id
      name: user.name, // 상대방의 이름
    };

    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setActiveChatRoom(user.uid); // 상대방 uid
  };

  setActiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.uid}
        style={{
          backgroundColor:
            user.uid === this.state.activeChatRoom && '#ffffff45',
        }}
        onClick={() => this.changeChatRoom(user)} // 상대방 정보 매개변수로 받음
      >
        # {user.name}
      </li>
    ));

  render() {
    const { users } = this.state;
    return (
      <div>
        <span className="flex items-center">
          <FaRegSmile className="mr-3" /> DIRECT MESSAGES(
          {users.length})
        </span>

        <ul className="list-none p-0 ">{this.renderDirectMessages(users)}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(DirectMessages);

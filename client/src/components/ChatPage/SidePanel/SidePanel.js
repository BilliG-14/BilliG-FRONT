import React from "react";
import ChatRooms from "./ChatRooms";
import Favorited from "./Favorited";
import UserPanel from "./UserPanel";
import DirectMessages from "./DirectMessages";

function SidePanel(props) {
  return (
    <div
      style={{
        backgroundColor: "#7B83EB",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel currentUser={props.currentUser} />
      <Favorited currentUser={props.currentUser} />
      <ChatRooms currentUser={props.currentUser} />
      <DirectMessages currentUser={props.currentUser} />
    </div>
  );
}

export default SidePanel;

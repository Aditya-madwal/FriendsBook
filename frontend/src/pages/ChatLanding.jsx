import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/chatComponents/ChatSidebar";
import ChatHeader from "../components/chatComponents/ChatHeader";
import Chatbubble from "../components/chatComponents/Chatbubble";
import ChatContainer from "../components/chatComponents/ChatContainer";
import api from "../api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../MyContext";

function ChatLanding() {
  let { connection_uid } = useParams();
  const { me } = useContext(MyContext);
  const [friend_object, setFriend] = useState(null);

  useEffect(() => {
    const fetchConnection = async () => {
      const response = await api
        .get(`api/fetchconnection/${connection_uid}`)
        .then((res) => {
          if (res.data.user1.username == me.username) {
            setFriend(res.data.user2);
          } else {
            setFriend(res.data.user1);
          }
          console.log("--------------");
          // console.log(friend);
          // alert(friend);
          console.log(friend_object);
        });
    };
    fetchConnection();
  }, [me, connection_uid]);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar friend={friend_object} />

        {/* Chatroom Container */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Header */}
          <ChatHeader friend={friend_object} />

          {/* Chat Messages */}
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}

export default ChatLanding;

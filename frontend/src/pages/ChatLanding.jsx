import React from "react";
import ChatSidebar from "../components/chatComponents/ChatSidebar";
import ChatHeader from "../components/chatComponents/ChatHeader";
import Chatbubble from "../components/chatComponents/Chatbubble";
import ChatContainer from "../components/chatComponents/ChatContainer";

function ChatLanding() {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <ChatSidebar />

        {/* Chatroom Container */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Header */}
          <ChatHeader />

          {/* Chat Messages */}
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}

export default ChatLanding;

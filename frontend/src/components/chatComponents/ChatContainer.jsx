import React, { useEffect, useState, useRef } from "react";
import Chatbubble from "./Chatbubble";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import { FiImage, FiSend } from "react-icons/fi"; // Importing icons from react-icons
import { IoSend } from "react-icons/io5";

function ChatContainer() {
  let { connection_uid } = useParams();
  const { me } = useContext(MyContext);

  let [messages, setMessages] = useState([]);
  let [msgCount, setMsgCount] = useState(0);

  const fetchmessages = async () => {
    try {
      const fetched_messages = await api.get(
        `chatapi/fetchmessages/${connection_uid}`
      );
      console.log(fetched_messages.data);
      setMessages(fetched_messages.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchmessages();
  }, [connection_uid]);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const socketRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const socketUrl = `ws://127.0.0.1:8000/ws/chat/${connection_uid}/`;

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message.message_data]);
      setMsgCount((prevCount) => prevCount + 1);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => socketRef.current.close();
  }, [socketUrl]);

  useEffect(() => {
    // Scroll to bottom whenever the messages array changes
    const e2 = document.getElementById("chats");
    e2.scroll({ top: e2.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (socketRef.current.readyState === WebSocket.OPEN) {
      if (text && !image) {
        const message = {
          content: text,
          username: me.username,
        };
        socketRef.current.send(JSON.stringify(message));
      } else if (text && image) {
        const message_obj = {
          content: text,
          image: null,
          username: me.username,
        };

        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64File = reader.result.split(",")[1];
            message_obj.image = base64File;
            socketRef.current.send(JSON.stringify(message_obj));
          };
          reader.readAsDataURL(image);
        }
      } else {
        console.warn("Cannot send an empty message");
      }
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
    setText("");
    setImage(null);
    setPreviewUrl(null);

    // Scroll to bottom after sending a message
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div
        className="flex-1 overflow-y-auto p-5 bg-gray-300 rounded-lg rounded-r-none bg-[url('https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Background.width-1200.format-webp.webp')] bg-no-repeat bg-cover bg-opacity-3"
        id="chats">
        <div
          id="chat-container"
          className="flex flex-col space-y-4"
          key={"messages"}>
          {messages?.map((m) => (
            <Chatbubble
              key={m.id}
              name={m.sender.username}
              timestamp={m.sent_on}
              content={m.content}
              pfp={m.sender.pfp}
            />
          ))}
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200  bottom-0  flex flex-col">
        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Selected"
              className="w-20 h-20 object-cover rounded-md border shadow-sm"
            />
          </div>
        )}
        <form
          className="flex items-center space-x-3"
          onSubmit={sendMessage}
          method="post">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
              handleFileChange(e);
            }}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-150">
            <FiImage size={24} />
          </button>
          <input
            type="text"
            id="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full focus:outline-none transition duration-150 flex justify-center">
            <IoSend />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatContainer;

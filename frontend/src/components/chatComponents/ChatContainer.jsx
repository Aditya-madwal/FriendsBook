import React, { useEffect, useState, useRef } from "react";
import Chatbubble from "./Chatbubble";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useContext } from "react";
import { MyContext } from "../../MyContext";

function ChatContainer() {
  let { connection_uid } = useParams();
  const { me, setMe } = useContext(MyContext);

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
    const chatContainer = document.getElementById("chat-container");
    // chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [connection_uid]);

  // web socket implementation : ------------------------------------------------------
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const socketRef = useRef(null);
  const scrollableDivRef = useRef(null);

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
      console.log(message.message_data);
      setMessages((prevMessages) => [...prevMessages, message.message_data]);
      console.log(messages);
      setMsgCount((msgCount = msgCount + 1));
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    var container = document.getElementById("messages");
    container.scrollTop = container.scrollHeight;
    return () => socketRef.current.close();
  }, [socketUrl]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    // chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  // --------------------------------------------------------SEnd message---------

  const sendMessage = async (e) => {
    e.preventDefault();
    if (socketRef.current.readyState === WebSocket.OPEN) {
      if (text && image == null) {
        const message = {
          content: text,
          username: me.username,
        };

        socketRef.current.send(JSON.stringify(message));
      } else if (text && image) {
        // sending both files and text over websocket ----------------------

        const message_obj = {
          content: text,
          image: null,
          username: me.username,
        };

        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64File = reader.result; // This will be a data URL
            const base64Data = base64File.split(",")[1]; // Extract the base64 part
            message_obj.image = base64Data;
            console.log(message_obj);

            // Send message over WebSocket
            socketRef.current.send(JSON.stringify(message_obj));
          };

          reader.readAsDataURL(image);
        } else {
          // Send message without image
          socketRef.current.send(JSON.stringify(message_obj));
        }
        // ------------------------------------------------
      } else {
        console.warn("Cannot send an empty message");
      }
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
    setText("");
    setImage(null);
    setPreviewUrl(null);
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Create a URL for the selected image to display as a preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Trigger the file input click event
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  // ----------------------------------------------------------------------------------

  return (
    <>
      <div className="flex-1 overflow-y-auto p-5 bg-gray-300 rounded-lg rounded-r-none">
        <div id="messages" className="flex flex-col space-y-4" key={"messages"}>
          {messages?.map((m) => {
            return (
              <div id="chat-container">
                <Chatbubble
                  name={m.sender.username}
                  timestamp={m.sent_on}
                  content={m.content}
                  pfp={m.sender.pfp}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <form className="relative m-3" onSubmit={sendMessage} method="post">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
              handleFileChange(e);
            }}
            style={{ display: "none" }} // Hide the default file input
          />

          <button
            type="button"
            onClick={handleFileButtonClick}
            className="text-black p-2 pr-3 pl-3 rounded-lg w-fit flex justify-center items-center gap-2 hover:bg-gray-200 hover:text-black slowhover">
            Add an image
            <span className="text-xl">{/* <BiImageAdd /> */}</span>
          </button>
          {previewUrl && (
            <div className="image-preview mt-4">
              <img
                className="mt-2 w-[200px] h-full rounded-md border-gray-200 shadow-sm sm:text-sm text-black mb-2"
                src={previewUrl}
                alt="Selected Image"
              />
            </div>
          )}
          <input
            type="text"
            id="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="submit"
              className="text-gray-600 hover:text-gray-700 mr-6">
              Send
            </button>
          </span>
        </form>
      </div>
    </>
  );
}

export default ChatContainer;

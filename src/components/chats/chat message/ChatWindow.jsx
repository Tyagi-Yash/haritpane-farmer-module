import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { addMessage, fetchMessages } from "../../../reduxtoolkit/slices/chats/chats";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import profilePic from "../../../assets/images/user-icon.svg";
import ChatMessageSkeleton from "../../skeletons/ChatMessageSkeleton";

export default function ChatWindow() {
  const [chatError, setChatError] = useState("");

  const dispatch = useDispatch();

  const chatBodyRef = useRef(null);

  const { activeChat, messages, messagesLoading } = useSelector((s) => s.services.chatSlice);

  useEffect(() => {
    if (!activeChat) return;

    dispatch(fetchMessages(activeChat.roomId));
  }, [activeChat]);

  const socket = getSocket();

  useEffect(() => {
    if (!socket || !activeChat) return;

    setChatError("");
    socket.emit("joinRoom", {
      roomId: activeChat.roomId,
      farmerId: activeChat.farmerId,
      serviceProviderId: activeChat.serviceProviderId,
      userType: "farmer",
      chatType: activeChat.chatType,
    });

    const messageHandler = (msg) => {
      if (msg.roomId === activeChat.roomId) {
        dispatch(addMessage(msg));
      }
    };

    const errorHandler = (errorMessage) => {
      setChatError("Chat is not available");
    };

    socket.on("recieveMessage", messageHandler);
    socket.on("statusError", errorHandler);

    return () => {
      socket.off("recieveMessage", messageHandler);
      socket.off("statusError", errorHandler);
    };
  }, [activeChat, socket]);

  useEffect(() => {
    if (!chatBodyRef.current) return;

    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages]);

  if (!activeChat) return <div className="p-3">Select a chat</div>;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-avatar">
          <img src={activeChat?.providerDetails?.profileImage || profilePic} />
        </div>
        <div>{<h4>{activeChat?.providerDetails?.name}</h4>}</div>
        <div className="chat-tools">
          <i className="fas fa-phone" />
        </div>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messagesLoading ? (
          <ChatMessageSkeleton />
        ) : (
          messages.map((msg) => <MessageBubble key={msg._id || msg.createdAt} msg={msg} />)
        )}
      </div>

      {chatError ? <div className="chat-error-banner">{chatError}</div> : <MessageInput />}
    </div>
  );
}

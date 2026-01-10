import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { addMessage, fetchMessages } from "../../../reduxtoolkit/slices/chats/chats";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const dispatch = useDispatch();

  const chatBodyRef = useRef(null);

  const { activeChat, messages } = useSelector((s) => s.services.chatSlice);

  useEffect(() => {
    if (!activeChat) return;

    dispatch(fetchMessages(activeChat.roomId));
  }, [activeChat]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !activeChat) return;

    socket.emit("joinRoom", {
      roomId: activeChat.roomId,
      farmerId: activeChat.farmerId,
      serviceProviderId: activeChat.serviceProviderId,
      userType: "farmer",
    });

    const handler = (msg) => {
      if (msg.roomId === activeChat.roomId) {
        dispatch(addMessage(msg));
      }
    };

    socket.on("recieveMessage", handler);

    return () => {
      socket.off("recieveMessage", handler);
    };
  }, [activeChat, messages]);

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
        {messages.map((msg) => (
          <MessageBubble key={msg._id || msg.createdAt} msg={msg} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

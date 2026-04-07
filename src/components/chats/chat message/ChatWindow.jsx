import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getSocket } from "../../../socket/socket";
import { addMessage, fetchMessages } from "../../../reduxtoolkit/slices/chats/chats";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import profilePic from "../../../assets/images/user-icon.svg";
import ChatMessageSkeleton from "../../skeletons/ChatMessageSkeleton";

export default function ChatWindow() {
  const { t } = useTranslation();
  const [chatError, setChatError] = useState("");

  const dispatch = useDispatch();

  const chatBodyRef = useRef(null);

  const { activeChat, messages, messagesLoading } = useSelector((s) => s.services.chatSlice);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (!activeChat) return;

    dispatch(fetchMessages(activeChat.roomId));
    setShowNumber(false);
  }, [activeChat, dispatch]);

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
      setChatError(t("chats.chatNotAvailable"));
    };

    socket.on("recieveMessage", messageHandler);
    socket.on("statusError", errorHandler);

    return () => {
      socket.off("recieveMessage", messageHandler);
      socket.off("statusError", errorHandler);
    };
  }, [activeChat, socket, dispatch, t]);

  useEffect(() => {
    if (!chatBodyRef.current) return;

    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages]);

  if (!activeChat) {
    return (
      <div className="chat-panel empty-chat">
        <div className="empty-chat-content">
          <h4>{t("chats.selectConversation")}</h4>
          <p>{t("chats.chooseChatToStart")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-avatar">
          <img src={activeChat?.providerDetails?.profileImage || profilePic} />
        </div>
        <div>{<h4>{activeChat?.providerDetails?.name}</h4>}</div>
        <div className="chat-tools">
          <div onClick={() => setShowNumber((prev) => !prev)}>
            {showNumber ? activeChat?.providerDetails?.phone : <i className="fas fa-phone" />}
          </div>
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

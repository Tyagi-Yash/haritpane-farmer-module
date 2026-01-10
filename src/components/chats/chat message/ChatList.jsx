import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, setActiveChat } from "../../../reduxtoolkit/slices/chats/chats";
import { useEffect } from "react";

export default function ChatList() {
  const { chatList, activeChat } = useSelector((s) => s.services.chatSlice);
  const dispatch = useDispatch();

  const openChat = (chat) => {
    dispatch(setActiveChat(chat));
    dispatch(fetchMessages(chat.roomId));
  };
 

  return (
    <div className="col-sm-5">
      <div className="chat-sidebar">
        <div className="chat-list">
          {chatList.map((chat) => (
            <div
              key={chat._id}
              className={`chat-item ${activeChat?._id === chat._id ? "active" : ""}`}
              onClick={() => openChat(chat)}
            >
              <img src={chat.providerDetails.profileImage} />
              <div>
                <h4>{chat.providerDetails.name}</h4>
                <p>{chat.lastMessage?.message}</p>
              </div>
              <span className="time">
                {new Date(chat.lastMessage.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setActiveChat } from "../../../reduxtoolkit/slices/chats/chats";
import { formatDateTo12Hour } from "../../../utils/formatTime12Hour";
import profilePic from "../../../assets/images/user-icon.svg";

export default function ChatList() {
  const { t } = useTranslation();
  const { chatList, activeChat } = useSelector((s) => s.services.chatSlice);
  const dispatch = useDispatch();

  const openChat = (chat) => {
    dispatch(setActiveChat(chat));
  };

  return (
    <div className="col-sm-5">
      <div className="chat-sidebar">
        <div className="chat-list">
          {chatList.length === 0 ? (
            <div className="no-chat">
              <h4>{t("chats.noConversationsYet")}</h4>
              <p>{t("chats.noActiveChats")}</p>
            </div>
          ) : (
            chatList.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${activeChat?._id === chat._id ? "active" : ""}`}
                onClick={() => openChat(chat)}
              >
                <img src={chat?.providerDetails?.profileImage || profilePic} alt="User" />
                <div className="chat-item-content">
                  <h4>{chat?.providerDetails?.name}</h4>
                  <p className="last-message">
                    {chat?.lastMessage?.message || t("chats.noMessagesYet")}
                  </p>
                </div>
                <span className="time">
                  {chat?.lastMessage?.createdAt
                    ? formatDateTo12Hour(chat.lastMessage.createdAt)
                    : ""}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

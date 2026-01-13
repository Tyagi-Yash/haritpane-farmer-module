import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { connectSocket, getSocket } from "../../socket/socket";
import TopbarModal from "../../components/common components/TopbarModal";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import ChatList from "../../components/chats/chat message/ChatList";
import ChatWindow from "../../components/chats/chat message/ChatWindow";
import profile from "../../assets/images/profile.png";
import { setActiveChat, fetchChatList, fetchMessages } from "../../reduxtoolkit/slices/chats/chats";

export default function ChatChatSection() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchChatList());
  }, []);

  const { chatList } = useSelector((s) => s.services.chatSlice);
  useEffect(() => {
    if (!location.state) return;

    const { roomId, farmerId, serviceProviderId } = location.state;

    const existingChat = chatList.find((chat) => chat.roomId === roomId);

    if (existingChat) {
      dispatch(setActiveChat(existingChat));
      dispatch(fetchMessages(existingChat.roomId));
    } else {
      const socket = getSocket();

      socket.emit("joinRoom", {
        roomId,
        farmerId,
        serviceProviderId,
        userType: "farmer",
      });

      const newChat = {
        roomId,
        farmerId,
        serviceProviderId,
        providerDetails: location.state.providerDetails,
      };

      dispatch(setActiveChat(newChat));
    }
  }, [location.state, chatList]);

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">Chats</h4>
            </div>
            <ChatsNavbar />
            <div className="tab-content">
              <div className="tab-pane active">
                <div className="row m-0">
                  <ChatList />
                  <div className="col-sm-7">
                    <ChatWindow />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

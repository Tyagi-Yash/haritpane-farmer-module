import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getSocket } from "../../socket/socket";
import TopbarModal from "../../components/common components/TopbarModal";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import ChatList from "../../components/chats/chat message/ChatList";
import ChatWindow from "../../components/chats/chat message/ChatWindow";
import profile from "../../assets/images/profile.png";
import { setActiveChat, fetchChatList, fetchMessages, resetChatState } from "../../reduxtoolkit/slices/chats/chats";

export default function ChatEnquirySection() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetChatState());
    dispatch(fetchChatList({ chatType: ["Local Shop", "Local Manufacturer"] }));
  }, [dispatch]);

  const { chatList } = useSelector((s) => s.services.chatSlice);

  useEffect(() => {
    const roomIdFromState = location.state?.roomId;
    if (!roomIdFromState) return;

    const existingChat = chatList.find((chat) => chat.roomId === roomIdFromState);

    if (existingChat) {
      dispatch(setActiveChat(existingChat));
      dispatch(fetchMessages(existingChat.roomId));
    } else {
      const { farmerId, serviceProviderId, chatType, providerDetails } = location.state;
      if (!farmerId || !serviceProviderId) return;

      const socket = getSocket();
      socket?.emit("joinRoom", {
        roomId: roomIdFromState,
        farmerId,
        serviceProviderId,
        userType: "farmer",
        chatType,
      });

      const newChat = {
        roomId: roomIdFromState,
        farmerId,
        serviceProviderId,
        providerDetails,
        chatType,
      };

      dispatch(setActiveChat(newChat));
    }
  }, [location.state, chatList, dispatch]);

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">{t("chats.title")}</h4>
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

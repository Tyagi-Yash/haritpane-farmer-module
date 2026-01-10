import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChatList } from "../../reduxtoolkit/slices/chats/chats";
import { connectSocket } from "../../socket/socket";
import TopbarModal from "../../components/common components/TopbarModal";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import ChatList from "../../components/chats/chat message/ChatList";
import ChatWindow from "../../components/chats/chat message/ChatWindow";
import profile from "../../assets/images/profile.png";

export default function ChatChatSection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatList());
    connectSocket();
  }, []);

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

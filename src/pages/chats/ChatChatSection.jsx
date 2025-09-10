import profile from "../../assets/images/profile.png";
import sendIcon from "../../assets/images/send-icon.svg";
import attachIcon from "../../assets/images/attach-icon.svg";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import TopbarModal from "../../components/common components/TopbarModal";

function ChatChatSection() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">Chats</h4>
              <div className="hide d-flex">
                <select className="form-control w-100">
                  <option>Sort by</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>
            <ChatsNavbar />
            <div className="tab-content">
              <div className="tab-pane active">
                <div className="row m-0">
                  <div className="col-sm-5">
                    <div className="chat-sidebar">
                      <div className="chat-list">
                        <div className="chat-item active">
                          <img src="https://i.pravatar.cc/40?img=1" alt />
                          <div>
                            <h4>George Alan</h4>
                            <p>Lorem ipsum dolor sit amet...</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p>Lorem ipsum dolor sit amet...</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p>📹 Video</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p>Lorem ipsum dolor sit amet...</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p>📹 Video</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p>Lorem ipsum dolor sit amet...</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p>📹 Video</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p>📹 Video</p>
                          </div>
                          <span className="time">4:30 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="chat-panel">
                      <div className="chat-header">
                        <div className="chat-avatar">
                          <img src="https://i.pravatar.cc/40?img=1" alt />
                          <span className="status online hide" />
                        </div>
                        <div>
                          <h4>George Alan</h4>
                          <p className="online hide">Online</p>
                        </div>
                        <div className="chat-tools">
                          <i className="fas fa-phone" />
                        </div>
                      </div>
                      <div className="chat-body">
                        <p className="chat time">Today</p>
                        <div className="msg from">
                          <div>Hi, is the watch still up for sale?</div>
                          <div className="send-info">
                            <small>4:30 PM</small>
                            <img
                              src="assets/images/Message-status.svg"
                              alt="message-status"
                              className="send-status hide"
                            />
                          </div>
                        </div>
                        <div className="msg to">
                          <div>Yes, it's available.</div>
                          <div>
                            <small>4:30 PM</small>
                          </div>
                        </div>
                        <div className="msg from">
                          <div>Awesome! Can I see a couple of pictures?</div>
                          <div className="send-info">
                            <small>4:30 PM</small>
                            <img
                              src="assets/images/Message-status.svg"
                              alt="message-status"
                              className="send-status hide"
                            />
                          </div>
                        </div>
                        <div className="msg to">
                          <div>Sure! Sending them over now.</div>
                          <div>
                            <small>4:30 PM</small>
                          </div>
                        </div>
                        <div className="msg from">
                          <div>Thanks! Looks good.</div>
                          <div className="send-info">
                            <small>4:30 PM</small>
                            <img
                              src="assets/images/Message-status.svg"
                              alt="message-status"
                              className="send-status hide"
                            />
                          </div>
                        </div>
                        <div className="msg from">
                          <div>I'll take it. Can you ship it?</div>
                          <div className="send-info">
                            <small>4:30 PM</small>
                            <img
                              src="assets/images/Message-status.svg"
                              alt="message-status"
                              className="send-status hide"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="chat-footer">
                        <div className="input-group">
                          <input type="text" placeholder="Type your message..." />
                          <button className="send">
                            <img src={sendIcon} alt="send-icon" className="link-icon" />
                          </button>
                          <img src={attachIcon} alt="Link" className="link-icon" />
                        </div>
                      </div>
                    </div>
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

export default ChatChatSection;

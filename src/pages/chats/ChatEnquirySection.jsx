import profile from "../../assets/images/profile.png";
import sendIcon from "../../assets/images/send-icon.svg";
import attachIcon from "../../assets/images/attach-icon.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import muthuvelRangan from "../../assets/images/Muthuvel-Rangan.png";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import TopbarModal from "../../components/common components/TopbarModal";

function ChatEnquirySection() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">Chats</h4>
              <div className="d-flex align-items-center">
                <select className="form-control w-100 me-3">
                  <option>Sort by</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
                <div className="yellow-btn">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#myModal">
                    <span>
                      <i className="fa-solid fa-plus" />
                    </span>{" "}
                    Add Enquiry
                  </a>
                </div>
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
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=2" alt />
                          <div>
                            <h4>Uber Cars</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p className="online">Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                        <div className="chat-item">
                          <img src="https://i.pravatar.cc/40?img=3" alt />
                          <div>
                            <h4>Saffya Fareena</h4>
                            <p>Enquiry ID: 434234243</p>
                          </div>
                          <span className="time">04/04/2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="chat-panel">
                      <div className="chat-header">
                        <div className="chat-avatar">
                          <img src="https://i.pravatar.cc/40?img=1" alt />
                        </div>
                        <div>
                          <h4>George Alan</h4>
                          <p className="online">Enquiry ID: 434234243</p>
                        </div>
                        <div className="chat-tools">
                          <button className="close-ticket">Close Ticket</button>
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
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <img src={closeIcon} data-bs-dismiss="modal" alt />
            </div>
            {/* Modal body */}
            <div className="m-3">
              <div className="user-card-modal">
                <img src={muthuvelRangan} alt="Profile" />
                <div className="user-details">
                  <h6 className="normal-heading">Muthuvel Rangan</h6>
                  <span className="grey-para">Grievance ID: 7566717 &nbsp;•&nbsp; 20/05/2025</span>
                </div>
              </div>
              <textarea
                className="form-control"
                rows={4}
                maxLength={100}
                placeholder="Cause of Concern*"
                defaultValue={""}
              />
              <div className="text-end small mt-1">
                <span id="charCount">0</span>/100
              </div>
            </div>
            <div className="m-3">
              <textarea
                className="form-control"
                rows={4}
                maxLength={100}
                placeholder="Detailed Solution*"
                defaultValue={""}
              />
              <div className="text-end small mt-1">
                <span id="charCount">0</span>/100
              </div>
            </div>
            {/* Modal footer */}
            <div className="modal-footer yellow-btn">
              <a href="#" data-bs-dismiss="modal">
                {" "}
                Raise Enquiry{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatEnquirySection;

import { NavLink } from "react-router-dom";

function ChatsNavbar() {
  return (
    <div className="row">
      <div className="col-sm-5">
        <div className="CommonTabs mt-0">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/message-chat">
                Message
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/review-chat">
                Reviews
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/enquiry-chat">
                Enquiry
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatsNavbar;

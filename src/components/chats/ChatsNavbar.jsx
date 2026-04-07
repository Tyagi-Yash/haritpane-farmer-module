import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ChatsNavbar() {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-sm-5">
        <div className="CommonTabs mt-0">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/message-chat">
                {t("chats.message")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/review-chat">
                {t("chats.reviews")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chats/enquiry-chat">
                {t("chats.enquiry")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatsNavbar;

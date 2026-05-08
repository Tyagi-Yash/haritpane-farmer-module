import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

import logo from "../../assets/images/brand-logo.svg";
import hindiLogo from "../../assets/images/hindi_logo.svg";
import profile from "../../assets/images/profile.svg";

import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";
import { logout } from "../../reduxtoolkit/slices/auth/auth";
import { useDispatch } from "react-redux";
import { resetChatState } from "../../reduxtoolkit/slices/chats/chats";
import { disconnectSocket } from "../../socket/socket";
import { clearBookingList } from "../../reduxtoolkit/slices/progress/bookingList";
import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";
import { accountMenu, mainMenu } from "../../constants/sidenav/sidenavData";
import { resetReviewList } from "../../reduxtoolkit/slices/rate and reviews/rateReview";

function SideNav() {
  const { t } = useTranslation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout());

      const status = res?.payload?.status;

      if (status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("farmerProfile");
        localStorage.removeItem("i18nextLng");
        localStorage.removeItem("fcmToken");
        toast.success(t("nav.logoutSuccess"));
        setShowLogoutModal(false);
        dispatch(resetChatState());
        dispatch(clearBookingList());
        dispatch(resetReviewList());
        disconnectSocket();

        i18n.changeLanguage("en");
        navigate("/signup");
      } else {
        toast.error(t("nav.logoutFail"));
      }
    } catch (error) {
      toast.error(t("nav.logoutError"));
    }
  };

  return (
    <>
      <div className="SidenavArea">
        <div className="SidenavHead">
          <figure>
            <img
              src={i18n.language === "hi" || i18n.language === "mr" ? hindiLogo : logo}
              alt="Logo"
            />
          </figure>
        </div>

        <div className="SidenavBody">
          <ul>
            {mainMenu.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}

            <DropdownMenu
              icon={profile}
              label="Account Settings"
              translateKey="nav.accountSettings"
              items={accountMenu}
            />

            <li className="logout-sidenav">
              <Link className="d-block" onClick={() => setShowLogoutModal(true)}>
                <span className="Text red">{t("nav.logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

export default SideNav;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

import logo from "../../assets/images/Logo.png";
import profile from "../../assets/images/profile.svg";

import help from "../../assets/images/help.svg";

import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";
import { logout } from "../../reduxtoolkit/slices/auth/auth";
import { useDispatch } from "react-redux";
import { resetChatState } from "../../reduxtoolkit/slices/chats/chats";
import { disconnectSocket } from "../../socket/socket";
import { clearBookingList } from "../../reduxtoolkit/slices/progress/bookingList";
import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";
import { accountMenu, helpMenu, mainMenu } from "../../constants/sidenav/sidenavData";
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
      const message = res?.payload?.data?.message;

      if (status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("farmerProfile");
        localStorage.removeItem("i18nextLng");
        toast.success(message || t("nav.logoutSuccess"));
        setShowLogoutModal(false);
        dispatch(resetChatState());
        dispatch(clearBookingList());
        dispatch(resetReviewList());
        disconnectSocket();
        
        i18n.changeLanguage("en");
        navigate("/signup");
      } else {
        toast.error(message || t("nav.logoutFail"));
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
            <img src={logo} alt="Logo" />
          </figure>
        </div>

        <div className="SidenavBody">
          <ul>
            {mainMenu.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}

            <DropdownMenu icon={profile} label="Account Settings" translateKey="nav.accountSettings" items={accountMenu} />
            <DropdownMenu icon={help} label="Help Center" translateKey="nav.helpCenter" items={helpMenu} />

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

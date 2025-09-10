import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import logo from "../../assets/images/Logo.png";
import profile from "../../assets/images/profile.svg";
import dashboard from "../../assets/images/dashboard.svg";
import services from "../../assets/images/services.svg";
import chat from "../../assets/images/chat.svg";
import notification from "../../assets/images/notification.svg";
import language from "../../assets/images/language.svg";
import myFarm from "../../assets/images/my-farm.svg";
import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";

function SideNav() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      console.log("User logged out!");
      navigate("/signup");
      setShowLogoutModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="SidenavArea">
        <div className="SidenavHead">
          <figure>
            <img src={logo} />
          </figure>
        </div>
        <div className="SidenavBody">
          <ul>
            <li>
              <NavLink to="/dashboard">
                <span className="Icon">
                  <img src={dashboard} alt="" />
                </span>
                <span className="Text">Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/service-tracking">
                <span className="Icon">
                  <img src={services} alt="" />
                </span>
                <span className="Text">Progress</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/service-category">
                <span className="Icon">
                  <img src={services} alt="" />
                </span>
                <span className="Text">Service Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chats">
                <span className="Icon">
                  <img src={chat} alt="" />
                </span>
                <span className="Text">Chats</span>
              </NavLink>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle as="a">
                  <span className="Icon">
                    <img src={profile} alt="profile" />
                  </span>
                  <span className="Text">Account Settings</span>
                </Dropdown.Toggle>

                <Dropdown.Menu as="ol">
                  <li>
                    <NavLink to="/notification">
                      <span className="Icon">
                        <img src={notification} alt="" />
                      </span>
                      <span className="DText">Notification</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/language">
                      <span className="Icon">
                        <img src={language} alt="" />
                      </span>
                      <span className="DText">Language</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">
                      <span className="Icon">
                        <img src={profile} alt="" />
                      </span>
                      <span className="DText">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/farm-home">
                      <span className="Icon">
                        <img src={myFarm} alt="" />
                      </span>
                      <span className="DText">My Farm</span>
                    </NavLink>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="logout-sidenav" data-bs-toggle="modal" data-bs-target="#LogoutModal">
              <Link className=".d-block" onClick={() => setShowLogoutModal(true)}>
                <span className="Text red">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} onLogout={handleLogout} />
    </>
  );
}

export default SideNav;

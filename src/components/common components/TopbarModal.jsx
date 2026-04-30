import profile from "../../assets/images/profile.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function TopbarModal({ titleBox, navigate, navigateState, secImage, title }) {
  const { t } = useTranslation();
  let profileData = {};
  try {
    profileData = JSON.parse(localStorage.getItem("farmerProfile") || "{}");
  } catch {
    profileData = {};
  }
  const { name, profileImage } = profileData || {};
  return (
    <div className="topbar">
      <div className="TitleBox">
        {Boolean(titleBox) && (
          <div className="TitleBox-top-bar">
            <span>
              <Link className="back-circle-navbar side-space" to={navigate} state={navigateState}>
                <i className="fa-solid fa-arrow-left" />
              </Link>
            </span>
            <h4 className="book-heading d-flex align-items-center">
              {secImage && (
                <span className="top-icon-image">
                  <img src={secImage} alt="" />
                </span>
              )}
              {title}
            </h4>
          </div>
        )}
      </div>
      <div className="right-section">
        <div className="search-box">
          <input type="text" placeholder={t("nav.searchPlaceholder")} />
          <i className="fas fa-search search-icon" />
        </div>
        <Link to="/notification" style={{ textDecoration: "none" }}>
          <i className="far fa-bell bell-icon" />
        </Link>

        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className="profile">
            <img src={profileImage ? profileImage : profile} alt="profile" />
            <span className="username">{name ? name : t("nav.defaultUser")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopbarModal;

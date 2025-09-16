import React from "react";
import { Link } from "react-router-dom";


function TopbarModal(props) {
  // localStorage.getItem
  return (
    <>
      <div className="topbar">
        <div className="TitleBox">
          <div className="TitleBox-top-bar">
            {Boolean(props.titleBox) && (
              <>
                <span>
                  <Link className="back-circle-navbar side-space" to={props.navigate}>
                    <i className="fa-solid fa-arrow-left" />
                  </Link>
                </span>
                <h4 className="book-heading d-flex align-items-center">
                  <span className="top-icon-image hide">
                    <img src={props.secImage} alt="" />
                  </span>
                  {props.title}
                </h4>
              </>
            )}
          </div>
        </div>
        <div className="right-section">
          <div className="search-box">
            <input type="text" placeholder="Search Services..." />
            <i className="fas fa-search search-icon" />
          </div>
          <i className="far fa-bell bell-icon" />
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="profile">
              <img src={props.profile} alt="profile" />
              <span className="username">Ramesh</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopbarModal;

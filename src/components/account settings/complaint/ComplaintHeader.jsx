import React from "react";

const ComplaintHeader = ({ title, sub, onRaiseClick, raiseBtnText }) => {
  return (
    <div className="complaint-page__top">
      <div className="complaint-page__header">
        <div>
          <h3 className="complaint-page__title">{title}</h3>
          <p className="complaint-page__sub">{sub}</p>
        </div>
        <button id="raise-complaint-btn" className="complaint-raise-btn" onClick={onRaiseClick}>
          <i className="fa fa-plus" />
          &nbsp;{raiseBtnText}
        </button>
      </div>
    </div>
  );
};

export default ComplaintHeader;

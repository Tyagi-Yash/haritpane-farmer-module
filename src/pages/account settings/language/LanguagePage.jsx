import React from "react";

import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";

function LanguagePage() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="dashboard">
            <div className="language-page option-wrapper mt-4">
              <div className="row">
                {/* Hindi */}
                <div className="col-md-6">
                  <div className="language-box">
                    <div className="lang-label fw-bold">हिंदी</div>
                    <div className="lang-sub text-muted">Hindi</div>
                  </div>
                </div>
                {/* English (Selected) */}
                <div className="col-md-6">
                  <div className="language-box active">
                    <div className="lang-label fw-bold">अंग्रेज़ी</div>
                    <div className="lang-sub text-muted">English</div>
                    <div className="checkmark">
                      <i className="fas fa-check-circle" />
                    </div>
                  </div>
                </div>
                {/* Marathi */}
                <div className="col-md-6">
                  <div className="language-box">
                    <div className="lang-label fw-bold">मराठी</div>
                    <div className="lang-sub text-muted">Marathi</div>
                  </div>
                </div>
              </div>
              <div className="available-service-btn">
                <a href="dashboard.html"> Save Language </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LanguagePage;

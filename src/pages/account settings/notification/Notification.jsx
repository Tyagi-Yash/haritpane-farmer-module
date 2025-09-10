import React from "react";

import profile from "../../../assets/images/profile.png";
import TopbarModal from "../../../components/common components/TopbarModal";

function Notification() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="dashboard">
            <div className="option-wrapper">
              <div>
                <div className="notification-row d-flex justify-content-between align-items-center">
                  <div>
                    <p className="main-heading">Push Notifications</p>
                    <p className="text-muted notifcation-para-text mb-0">
                      Get real-time updates about offers, orders, and services directly on your phone.
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input type="checkbox" id="pushToggle" className="pure-switch" defaultChecked />
                  </div>
                </div>
                <div className="notification-row d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="main-heading">Whatsapp Notifications</p>
                    <p className="text-muted notifcation-para-text mb-0">
                      Receive alerts and updates on WhatsApp about your orders and new product launches.
                    </p>
                  </div>
                  <div className="form-check form-switch">
                    <input type="checkbox" id="whatsappToggle" className="pure-switch" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;

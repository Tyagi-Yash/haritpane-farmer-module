import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import TopbarModal from "../../../components/common components/TopbarModal";
import {
  editFarmerProfile,
  getFarmerProfile,
} from "../../../reduxtoolkit/slices/account settings/profile";

function Notification() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    chatNotification: false,
    pushNotification: false,
  });
  const { chatNotification, pushNotification } = notifications;

  const fetchNotification = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getFarmerProfile());
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setNotifications({
          pushNotification: data?.data?.pushNotification,
          chatNotification: data?.data?.chatNotification,
        });
      } else {
        toast.error(data?.message || "Failed to load notifications. Try again later.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleChange = async (e) => {
    setLoading(true);
    const { name, checked } = e.target;
    const updatedState = { ...notifications, [name]: checked };
    try {
      const res = await dispatch(editFarmerProfile(updatedState));
      const status = res?.payload?.status;
      const { message } = res?.payload?.data || {};
      if (status === 200) {
        setNotifications(updatedState);
        toast.success(message || "Updated successfully");
      } else {
        toast.error(message || "Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title="Notification" navigate="/dashboard" />
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
                  <input
                    type="checkbox"
                    className="pure-switch"
                    name="pushNotification"
                    checked={pushNotification}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="notification-row d-flex justify-content-between align-items-center mb-4">
                <div>
                  <p className="main-heading">Whatsapp Notifications</p>
                  <p className="text-muted notifcation-para-text mb-0">
                    Receive alerts and updates on WhatsApp about your orders and new product
                    launches.
                  </p>
                </div>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="pure-switch"
                    name="chatNotification"
                    checked={chatNotification}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;

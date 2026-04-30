import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import {
  editFarmerProfile,
  getFarmerProfile,
} from "../../../reduxtoolkit/slices/account settings/profile";

function Notification() {
  const { t } = useTranslation();
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
        toast.error(t("account.failedToLoadNotifications"));
      }
    } catch (err) {
      toast.error(t("common.somethingWentWrong"));
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
      if (status === 200) {
        setNotifications(updatedState);
        toast.success(t("account.updatedSuccessfully"));
      } else {
        toast.error(t("account.failedToUpdate"));
      }
    } catch (error) {
      toast.error(t("common.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title={t("account.notification")} navigate="/dashboard" />
        <div className="dashboard">
          <div className="option-wrapper">
            <div>
              <div className="notification-row d-flex justify-content-between align-items-center">
                <div>
                  <p className="main-heading">{t("account.pushNotifications")}</p>
                  <p className="text-muted notifcation-para-text mb-0">
                    {t("account.pushNotificationsDesc")}
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
                  <p className="main-heading">{t("account.whatsappNotifications")}</p>
                  <p className="text-muted notifcation-para-text mb-0">
                    {t("account.whatsappNotificationsDesc")}
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

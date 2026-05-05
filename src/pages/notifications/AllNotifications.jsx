import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TopbarModal from "../../components/common components/TopbarModal";
import {
  getAllNotifications,
  clearNotifications,
  markNotificationsAsRead,
} from "../../reduxtoolkit/slices/notifications/notificationSlice";

const AllNotifications = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { notifications, loader, metadata } = useSelector(
    (state) => state.services.notificationSlice,
  );
  const observer = useRef();

  const pageMeta = Array.isArray(metadata) ? metadata[0] : metadata || {};

  const lastNotificationElementRef = useCallback(
    (node) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageMeta.isNext) {
          dispatch(getAllNotifications({ page: (pageMeta.page || 1) + 1, limit: 10 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loader, pageMeta.isNext, pageMeta.page, dispatch],
  );

  useEffect(() => {
    dispatch(clearNotifications());
    dispatch(getAllNotifications({ page: 1, limit: 10 }));
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getNotificationStyle = (notification) => {
    const type = notification?.type;

    switch (type) {
      case "job_order_auto_cancelled":
        return {
          icon: "fas fa-exclamation-triangle",
          tone: "danger",
        };

      case "booking_cancelled_by_provider":
        return {
          icon: "fas fa-calendar-times",
          tone: "warning",
        };

      case "quotation_received":
        return {
          icon: "fas fa-file-invoice-dollar",
          tone: "success",
        };

      default:
        return {
          icon: "fas fa-bell",
          tone: "primary",
        };
    }
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationsAsRead({ notificationIds: [id] }));
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n._id);
    if (unreadIds.length > 0) {
      dispatch(markNotificationsAsRead({ notificationIds: unreadIds }));
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="WrapperArea notifications-page">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title={t("nav.notifications")} navigate="/dashboard" />

        <div className="notification-shell">
          <div className="notification-page-header"></div>

          <div className="notification-container">
            {notifications.length === 0 && !loader ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <i className="fas fa-bell-slash"></i>
                </div>
                <h3>{t("notifications.noNotifications")}</h3>
                <p>{t("notifications.noNotificationsDesc")}</p>
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((notification, index) => {
                  const isLast = notifications.length === index + 1;
                  const style = getNotificationStyle(notification);

                  const card = (
                    <div
                      className={`notification-card ${!notification.isRead ? "unread" : ""} tone-${style.tone}`}
                    >
                      <div className="notification-icon-wrapper">
                        <div className={`notification-icon tone-${style.tone}`}>
                          <i className={style.icon}></i>
                        </div>
                      </div>

                      <div className="notification-content">
                        <div className="notification-top-row">
                          <div className="notification-meta">
                            <span className="notification-category">{notification.category}</span>
                            {!notification.isRead && <div className="unread-dot"></div>}
                          </div>

                          <div className="notification-actions">
                            {!notification.isRead && (
                              <button
                                className="item-mark-read-btn"
                                onClick={() => handleMarkAsRead(notification._id)}
                              >
                                Mark as read
                              </button>
                            )}
                            <div className="notification-time">
                              {formatDate(notification.createdAt)}
                            </div>
                          </div>
                        </div>

                        <h4 className="notification-title">{notification.title}</h4>
                        <p className="notification-message">{notification.message}</p>
                      </div>
                    </div>
                  );

                  return isLast ? (
                    <div ref={lastNotificationElementRef} key={notification._id}>
                      {card}
                    </div>
                  ) : (
                    <div key={notification._id}>{card}</div>
                  );
                })}

                {loader && (
                  <div className="loading-indicator">
                    <div
                      className="spinner-border spinner-border-sm text-success me-2"
                      role="status"
                    ></div>
                    <span>{t("common.loading")}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNotifications;

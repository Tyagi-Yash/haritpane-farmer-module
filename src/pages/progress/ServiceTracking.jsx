import { useDispatch, useSelector } from "react-redux";
import TopbarModal from "../../components/common components/TopbarModal";
import { setActiveTab } from "../../reduxtoolkit/slices/progress/bookingList";
import { useTranslation } from "react-i18next";
// import JobOrderCard from "../../components/progress/job order/JobOrderCard";
import ServiceTrackingTab from "../../components/progress/service tracking tab/ServiceTrackingTab";
import JobOrderList from "../../components/progress/job order/JobOrderList";

function ServiceTracking() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { activeTab } = useSelector((state) => state.services.bookingListSlice);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox title={t("progress.serviceTracking")} navigate="/dashboard" />

        <div className="row progress-tab">
          <div className="CommonTabs mb-0">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "serviceTracking" ? "active" : ""}`}
                  onClick={() => dispatch(setActiveTab("serviceTracking"))}
                >
                  {t("progress.serviceTracking")}
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "jobOrder" ? "active" : ""}`}
                  onClick={() => dispatch(setActiveTab("jobOrder"))}
                >
                  {t("progress.jobOrder")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === "serviceTracking" && <ServiceTrackingTab />}
        {activeTab === "jobOrder" && <JobOrderList />}
      </div>
    </div>
  );
}

export default ServiceTracking;

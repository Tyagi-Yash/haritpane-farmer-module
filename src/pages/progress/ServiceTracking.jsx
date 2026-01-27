import { useDispatch, useSelector } from "react-redux";
import TopbarModal from "../../components/common components/TopbarModal";
import { setActiveTab } from "../../reduxtoolkit/slices/progress/bookingList";
import JobOrderCard from "../../components/progress/JobOrderCard";
import ServiceTrackingTab from "../../components/progress/service tracking tab/ServiceTrackingTab";

function ServiceTracking() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.services.bookingListSlice);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox title="Service Tracking" navigate="/dashboard" />

        <div className="row progress-tab">
          <div className="CommonTabs mb-0">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "serviceTracking" ? "active" : ""}`}
                  onClick={() => dispatch(setActiveTab("serviceTracking"))}
                >
                  Service Tracking
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "jobOrder" ? "active" : ""}`}
                  onClick={() => dispatch(setActiveTab("jobOrder"))}
                >
                  Job Order
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === "serviceTracking" && <ServiceTrackingTab />}
        {activeTab === "jobOrder" && <JobOrderCard />}
      </div>
    </div>
  );
}

export default ServiceTracking;

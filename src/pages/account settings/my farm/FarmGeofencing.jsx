import TopbarModal from "../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function FarmGeofencing() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={true} title="My Farm" navigate="/my-farms" />
          <div className="dashboard my-farm-api">
            <div className="d-flex align-items-center justify-content-center">
              <div className="add-field-card">
                This screen will be design at time of API implementation(geo fencing API)
              </div>
            </div>
            <div className="available-service-btn">
              <Link to="/my-farms/form">Add Field</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FarmGeofencing;

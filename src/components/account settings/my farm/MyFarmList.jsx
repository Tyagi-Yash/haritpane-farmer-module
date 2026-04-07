import { Link, useNavigate } from "react-router-dom";

import miniMap from "../../../assets/images/mini-map.png";
import editRectangle from "../../../assets/images/edit-rectangle.svg";
import view from "../../../assets/images/view.svg";

function MyFarmList({ farms = [] }) {
  const navigate = useNavigate();

  const handleEdit = (farm) => {
    navigate("/my-farms/form", { state: { farm } });
  };

  return (
    <>
      <div className="dashboard my-farms-cards my-maps-card-sections">
        <div className="option-wrapper">
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link
                to="/my-farms/map"
                className="add-farm-btn-card card shadow-sm border-0 d-flex align-items-center justify-content-center"
                style={{
                  height: "100%",
                  minHeight: "200px",
                  background: "#f8f9fa",
                  border: "2px dashed #dee2e6",
                  textDecoration:"none"
                }}
              >
                <div className="text-center">
                  <i className="fa fa-plus-circle fa-2x text-success mb-2"></i>
                  <h5 className="mb-0">Add Field</h5>
                </div>
              </Link>
            </div>
            {farms.map((farm) => (
              <div className="col-md-4 mb-3" key={farm._id}>
                <div className="farm-card-view">
                  <figure className="maps-scroll">
                    <img src={miniMap} alt={farm.farmName} />
                    <div className="tap-view">
                      <h4>Tap to view on map</h4>
                    </div>
                  </figure>
                  <div className="name-icon">
                    <h4 className="normal-text">{farm.farmName}</h4>
                    <div>
                      <img src={view} alt="view" style={{ cursor: "pointer" }} />
                      <img
                        src={editRectangle}
                        alt="edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(farm)}
                      />
                    </div>
                  </div>
                  <div className="available-service-btn">
                    <Link to="/my-farms/details" className="send-btn">
                      View detailed forecast
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyFarmList;

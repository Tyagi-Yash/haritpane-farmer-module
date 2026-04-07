import { Link } from "react-router-dom";
import Grass from "../../../assets/images/grass.png";

function NoFarmList() {
  return (
    <div className="dashboard my-farms">
      <div className="d-flex align-items-center justify-content-center">
        <div className="add-field-card">
          <figure>
            <img src={Grass} alt="" />
          </figure>
          <h6 className="normal-heading">Grow Smarter with Your Farm</h6>
          <p className="grey-para">Personalize your HaritPane experience with your farm info.</p>
          <div className="available-service-btn">
            <Link to="/my-farms/map" className="send-btn">
              Add Field
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoFarmList;

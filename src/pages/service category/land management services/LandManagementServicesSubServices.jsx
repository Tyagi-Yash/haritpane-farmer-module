import { useState } from "react";
import { Link } from "react-router-dom";

import TopbarModal from "../../../components/common components/TopbarModal";
import landManagementTractorServices from "../../../assets/images/land-management-tractor-services.png";
import TractorandAttachment from "../../../assets/images/TractorandAttachment.png";
import onlyAttachment from "../../../assets/images/only-attachment.png";
import locationBlack from "../../../assets/images/location-black.svg";

function LandManagementServicesSubServices() {
  const [formState, setFormState] = useState({
    subServices: "trackter_attachments",
    lat: "",
    lng: "",
    hpOfTractor: "",
    equipmentInformation: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
  });
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});

  const { subServices, lat, lng, hpOfTractor, equipmentInformation, fromDate, toDate, fromTime } =
    formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title="Land Management Services"
          secImage={landManagementTractorServices}
          navigate="/service-category"
        />
        <div className="dashboard">
          <form>
            <div className="option-wrapper">
              <h3 className="main-heading">Sub Services</h3>
              <div className="sub-service-wrapper">
                <div className="row">
                  <div className="col">
                    <label id="tractorOption" className="tile">
                      <input
                        type="radio"
                        name="subServices"
                        value="trackter_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                        defaultChecked
                      />
                      <div className="radio-card">
                        <img src={TractorandAttachment} alt="Tractor & Attachment" />
                        <span className="radio-label">Tractor &amp; Attachment</span>
                      </div>
                    </label>
                  </div>
                  <div className="col">
                    <label id="attachmentOption" className="tile">
                      <input
                        type="radio"
                        name="subServices"
                        value="only_attachments"
                        className="radio-input"
                        onChange={handleInputChange}
                      />
                      <div className="radio-card">
                        <img src={onlyAttachment} alt="Only Attachment" />
                        <span className="radio-label">Only Attachment</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="option-wrapper">
              <div className="form-section">
                <h5 className="book-heading">Book your service</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="location-wrapper">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Farm location*"
                        required
                      />
                      <img src={locationBlack} alt="" className="location-icon" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select className="form-control" defaultValue="" required>
                      <option value="" disabled>
                        Select attachment*
                      </option>
                      <option value="Plough">Plough</option>
                      <option value="Cultivator">Cultivator</option>
                      <option value="Sprayer">Sprayer</option>
                      <option value="Power_Tiller">Power Tiller</option>
                      <option value="Rotavator">Rotavator</option>
                      <option value="Baler">Baler</option>
                      <option value="Harrow">Harrow</option>
                      <option value="Super_Seeder">Super Seeder</option>
                      <option value="Seed_Drill">Seed Drill</option>
                      <option value="Trolly">Trolly</option>
                      <option value="Thresher">Thresher</option>
                    </select>
                  </div>
                  {subServices === "trackter_attachments" && (
                    <div className="col-md-4">
                      <select className="form-control" defaultValue="TractorCategory" required>
                        <option value="TractorCategory" disabled>
                          Select Tractor Category*
                        </option>
                        <option value="Under_20">Under 20 hp</option>
                        <option value="21-30">21-30 hp</option>
                        <option value="31-40">31-40 hp</option>
                        <option value="41-45">41-45 hp</option>
                        <option value="46-50">46-50 hp</option>
                        <option value="Above_50">Above 50 hp</option>
                      </select>
                    </div>
                  )}
                </div>
                <h5 className="book-heading">Book Services date &amp; time</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <input type="date" className="form-control" placeholder="From date*" required />
                  </div>
                  <div className="col-md-4">
                    <input type="date" className="form-control" placeholder="Till date*" required />
                  </div>
                  <div className="col-md-4">
                    <input type="time" className="form-control" placeholder="From time*" required />
                  </div>
                </div>
              </div>
            </div>
            <div className="available-service-btn">
              <Link to="available-services">See Available Service</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandManagementServicesSubServices;

import profile from "../../../../assets/images/profile.png";
import locationBlack from "../../../../assets/images/location-black.svg";
import sortArrowDown from "../../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../../assets/images/product-image.png";
import landManagementTractorServices from "../../../../assets/images/land-management-tractor-services.png";
import TopbarModal from "../../../../components/common components/TopbarModal";
import { Link } from "react-router-dom";

function LocalManufacturerModule() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="View Local Shop"
            secImage={landManagementTractorServices}
            navigate="/dashboard"
            profile={profile}
          />
          <div className="dashboard local-shops">
            <div className="product-filter-area">
              <div>
                <h6 className="book-heading">Products</h6>
              </div>
              <div className="search-sort">
                <div className="location-wrapper">
                  <input type="text" className="form-control" placeholder="Farm location*" required />
                  <img src={locationBlack} alt="" className="location-icon" />
                </div>
                <div className="sort-box" id="sortBox">
                  <div className="sort-toggle">
                    <span>
                      <span id="sortSelectedLabel" className="sort-label">
                        Sort
                      </span>
                      <img src={sortArrowDown} alt="Sort Icon" />
                    </span>
                  </div>
                  <div className="sort-menu">
                    <div className="sort-option">Top rating</div>
                    <div className="sort-option">Out of Radius</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="product-card">
                  <Link to="product-details">
                    <div className="image-part">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">Plow Force Assist</h6>
                      <p className="normal-para">Vendor Name: Grain Edge</p>
                      <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">Send Enquiry</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocalManufacturerModule;

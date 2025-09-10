import profile from "../../../../assets/images/profile.png";
import landManagementTractorServices from "../../../../assets/images/land-management-tractor-services.png";
import forceTractor from "../../../../assets/images/force-tractor.png";
import shareIcon from "../../../../assets/images/share-icon.svg";
import customerReviewLocalHops from "../../../../assets/images/customer-review-local-hops.png";
import TopbarModal from "../../../../components/common components/TopbarModal";

function LocalManufacturerProductDetails() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal
            titleBox={true}
            title="Plow Force Assist"
            secImage={landManagementTractorServices}
            navigate="/dashboard/local-manufacturers"
            profile={profile}
          />
          <div className="dashboard local-product-details">
            <figure className="status-image-tag">
              <img src={forceTractor} alt="" />
              <div className="status-tag-share">
                <img src={shareIcon} alt="" />
              </div>
            </figure>
            <div>
              {/* Title & Rating */}
              <div className="mb-3">
                <h4 className="mb-0 me-2 main-heading">FieldTrac Services</h4>
                <div>
                  <span className="rating-badge">4.2</span>
                  <span className="text-warning">★★★★★</span>
                </div>
              </div>
              {/* Description */}
              <div className="mb-4">
                <h6 className="normal-heading">Product Description</h6>
                <p className="grey-para">
                  FieldTrac Services offers reliable, on-demand tractor solutions designed to simplify land
                  preparation, plowing, leveling, and harvesting for Indian farmers. We bring the power of
                  technology to your fields—efficiently, affordably, and locally.
                </p>
              </div>
              {/* Specifications */}
              <div className="mb-4">
                <h6 className="normal-heading">Product Specifies</h6>
                <table className="table table-transparent align-middle spec-table">
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Service Type</td>
                      <td>Tractor Rental for Plowing, Harrowing, and Seeding</td>
                    </tr>
                    <tr>
                      <td>Tractor Type</td>
                      <td>45 HP 4WD – Mahindra Yuvo 575 DI</td>
                    </tr>
                    <tr>
                      <td>Operator Included</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Fuel Charges</td>
                      <td>Included up to 4 hours</td>
                    </tr>
                    <tr>
                      <td>Hourly Rate</td>
                      <td>₹450/hour</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 className="normal-heading">Reviews</h5>
              {/* Review Summary */}
              <div className="row rating-summary mb-4">
                {/* Left Section: Ratings Distribution */}
                <div className="col-md-10">
                  {/* Row for each rating */}
                  <div className="d-flex align-items-center mb-2">
                    <div className="rating-label">
                      5 <span className="star">★</span>
                    </div>
                    <div className="bar-bg flex-grow-1 mx-2">
                      <div className="rating-bar" style={{ width: "80%" }} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="rating-label">
                      4 <span className="star">★</span>
                    </div>
                    <div className="bar-bg flex-grow-1 mx-2">
                      <div className="rating-bar" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="rating-label">
                      3 <span className="star">★</span>
                    </div>
                    <div className="bar-bg flex-grow-1 mx-2">
                      <div className="rating-bar" style={{ width: "40%" }} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="rating-label">
                      2 <span className="star">★</span>
                    </div>
                    <div className="bar-bg flex-grow-1 mx-2">
                      <div className="rating-bar" style={{ width: "10%" }} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="rating-label">
                      1 <span className="star">★</span>
                    </div>
                    <div className="bar-bg flex-grow-1 mx-2">
                      <div className="rating-bar" style={{ width: "5%" }} />
                    </div>
                  </div>
                </div>
                {/* Right Section: Average Rating */}
                <div className="col-md-2 text-center d-flex flex-column justify-content-center align-items-center">
                  <h2 className="fw-bold mb-0">4.2</h2>
                  <div>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="review-count mt-1">120 Reviews</div>
                </div>
              </div>
              {/* Individual Reviews */}
              <div>
                <div className="review-user d-flex align-items-start mb-2">
                  <img className="me-2" src={customerReviewLocalHops} alt="Ramesh Yadav" />
                  <div>
                    <strong className="normal-text">Ramesh Yadav</strong>
                    <div>
                      <span className="text-warning">★★★★☆</span>
                      <small className="time-text">10 mins ago</small>
                    </div>
                  </div>
                </div>
                <p className="grey-para">
                  Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation.
                  Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
                </p>
                <div className="divider" />
              </div>
              <div>
                <div className="review-user d-flex align-items-center mb-2">
                  <img className="me-2" src={customerReviewLocalHops} alt="Ramesh Yadav" />
                  <div>
                    <strong className="normal-text">Ramesh Yadav</strong>
                    <div>
                      <span className="text-warning">★★★★☆</span>
                      <small className="time-text">10 mins ago</small>
                    </div>
                  </div>
                </div>
                <p className="grey-para">
                  Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation.
                  Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
                </p>
                <div className="divider" />
              </div>
              <div>
                <div className="review-user d-flex align-items-center mb-2">
                  <img className="me-2" src={customerReviewLocalHops} alt="Ramesh Yadav" />
                  <div>
                    <strong className="normal-text">Ramesh Yadav</strong>
                    <div>
                      <span className="text-warning">★★★★☆</span>
                      <small className="time-text">10 mins ago</small>
                    </div>
                  </div>
                </div>
                <p className="grey-para">
                  Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation.
                  Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
                </p>
                <div className="divider" />
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-5">
              <button type="button" className="send-enquiry-btn">
                Send Enquiry
              </button>
              <button href="#" type="submit" className="call-us-edit">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocalManufacturerProductDetails;

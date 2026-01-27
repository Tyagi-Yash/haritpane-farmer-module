import forceTractor from "../../../assets/images/force-tractor.png";
import shareIcon from "../../../assets/images/share-icon.svg";
import customerReviewLocalHops from "../../../assets/images/customer-review-local-hops.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { useLocation, useParams } from "react-router-dom";
import { getProductById } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function LocalProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const backPath = location.state?.from || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});

  const loadProductDetails = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getProductById({ productId: id }));
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setProductDetails(data?.data || {});
      } else {
        toast(data?.message || "Failed to load product details");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductDetails();
  }, []);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={productDetails?.productName || ""}
          navigate={backPath}
        />
        <div className="dashboard local-product-details">
          <figure className="status-image-tag">
            <div className="image-cover">
              {!loading && (
                <img
                  className="product-image"
                  src={productDetails?.productImage?.[0] || forceTractor}
                  alt="Product Image"
                />
              )}
            </div>
            <div className="status-tag-share">
              <img src={shareIcon} alt="shareIcon" />
            </div>
          </figure>
          <div>
            <div className="mb-3">
              <h4 className="mb-0 me-2 main-heading">
                {productDetails?.productName || "Name not available"}
              </h4>
              <div>
                <span className="rating-badge">{productDetails.rating}</span>
                <span className="text-warning">★★★★★</span>
              </div>
            </div>
            <div className="mb-4">
              <h6 className="normal-heading">Product Description</h6>
              <p className="grey-para">
                {productDetails?.productDescription || "Description not available"}
              </p>
            </div>
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
                    <td>
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td>Tractor Type</td>
                    <td>
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td>Operator Included</td>
                    <td>
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td>Fuel Charges</td>
                    <td>
                      N/A
                    </td>
                  </tr>
                  <tr>
                    <td>Hourly Rate</td>
                    <td>
                      N/A
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5 className="normal-heading">Reviews</h5>
            <div className="row rating-summary mb-4">
              <div className="col-md-10">
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
              <div className="col-md-2 text-center d-flex flex-column justify-content-center align-items-center">
                <h2 className="fw-bold mb-0">{productDetails.rating}</h2>
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
                Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco
                exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
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
                Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco
                exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
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
                Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco
                exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua.
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
  );
}

export default LocalProductDetails;

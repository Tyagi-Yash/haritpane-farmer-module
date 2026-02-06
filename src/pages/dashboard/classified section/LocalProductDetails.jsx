import forceTractor from "../../../assets/images/force-tractor.png";
import shareIcon from "../../../assets/images/share-icon.svg";
import TopbarModal from "../../../components/common components/TopbarModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getAllProductReviews,
  getProductById,
} from "../../../reduxtoolkit/slices/dashboard/classifiedSection";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ProductReviews from "../../../components/dashboard/ProductReviews";
import AddReview from "../../../components/dashboard/AddReview";
import StarRating from "../../../components/dashboard/StarRating";

function LocalProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const backPath = location.state?.from || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [showNumber, setShowNumber] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
    if (id) loadProductDetails();
  }, [id]);

  const handleStartChat = () => {
    const productIdLast12 = productDetails._id.slice(-12);
    const farmerIdLast12 = productDetails.farmerId.slice(-12);

    navigate("/chats", {
      state: {
        roomId: productIdLast12 + farmerIdLast12,
        farmerId: productDetails.farmerId,
        serviceProviderId: productDetails.providerDetails._id,
        providerDetails: productDetails.providerDetails,
        chatType: productDetails.createdBy,
      },
    });
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={productDetails?.productName || ""}
          navigate={backPath}
        />
        <div className="dashboard local-product-details pb-0">
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

          <div className="mb-3">
            <h4 className="mb-0 me-2 main-heading">
              {productDetails?.productName || "Name not available"}
            </h4>
            <div>
              <span className="rating-badge">
                {productDetails?.providerDetails?.averageRating || "0"}
              </span>
              <StarRating rating={productDetails?.providerDetails?.averageRating || "0"} />
            </div>
          </div>
          <div className="mb-4">
            <h6 className="normal-heading">Product Description</h6>
            <p className="grey-para">
              {productDetails?.productDescription || "Description not available"}
            </p>
          </div>

          <ProductReviews providerId={productDetails?.providerDetails?._id} />

          <div className="bottom-buttons d-flex">
            <div className="button-group">
              <button type="button" className="send-enquiry-btn" onClick={handleStartChat}>
                Start Chat
              </button>
              <button
                type="submit"
                className="call-us-edit"
                onClick={() => setShowReviewModal(true)}
              >
                Add Review
              </button>
              <button
                type="submit"
                className="call-us-edit"
                onClick={() => setShowNumber((prev) => !prev)}
              >
                {showNumber ? productDetails?.providerDetails?.phone || "N/A" : "Call"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddReview
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        onSuccess={() =>
          dispatch(getAllProductReviews({ providerId: productDetails?.providerDetails?._id }))
        }
        providerId={productDetails?.providerDetails?._id}
      />
    </div>
  );
}

export default LocalProductDetails;

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../assets/images/product-image.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllProductsForFarmer } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";

function LocalProductsListingModule() {
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  console.log(products);
  const loadProducts = async () => {
    setLoading(true);

    const paramData = {
      createdBy: pathname === "/dashboard/local-shops" ? "india_mart" : "just_dial",
    };

    try {
      const res = await dispatch(getAllProductsForFarmer(paramData));
      const { status, data } = res?.payload || {};
      if (status === 200) {
        setProducts(data?.data?.[0]?.data || []);
      } else {
        toast(data?.message || "Failed to load Services");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [pathname]);

  const handleEnquiryClick = (id) => {
    navigate(`product-details/:${id}`);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={
            pathname === "/dashboard/local-shops" ? "View Local Shop" : "View Local Manufacturer"
          }
          navigate="/dashboard"
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
            {loading ? (
              <p style={{ color: "gray", marginTop: "10px" }}>Loading services...</p>
            ) : products.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>No product found.</p>
            ) : (
              products.map((product) => (
                <div className="col-md-4 mb-3" key={product._id}>
                  <div className="product-card">
                    <Link to="product-details" onClick={() => handleEnquiryClick(product._id)}>
                      <div className="image-part">
                        <img
                          src={product.productImage?.[0] || productImage}
                          alt={product.productName || "Product"}
                        />
                      </div>
                      <div className="card-text-part">
                        <h6 className="normal-heading">{product.productName}</h6>
                        <p className="normal-para">Vendor Name: Grain Edge</p>
                        <p className="normal-para">Sameypur, Rajpura Block, Meerut</p>
                      </div>
                      <div className="available-service-btn">
                        <button
                          onClick={() => handleEnquiryClick(product._id)}
                          className="send-btn"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalProductsListingModule;

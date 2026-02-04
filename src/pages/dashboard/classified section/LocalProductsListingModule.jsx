import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../assets/images/product-image.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import ClassifiedSectionSkeleton from "../../../components/skeletons/ClassifiedSectionSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";
import { getAllProductsForFarmer } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";

function LocalProductsListingModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { loading, products, listingPagePaginationData } = useSelector(
    (state) => state.services.ClassifiedSectionMgmtSlice,
  );

  const [currentPage, setCurrentPage] = useState(listingPagePaginationData.page || 1);

  const loadProducts = useCallback(async () => {
    try {
      const params = {
        createdBy: pathname === "/dashboard/local-shops" ? "just_dial" : "india_mart",
        page: currentPage,
      };
      await dispatch(getAllProductsForFarmer(params)).unwrap();
    } catch (err) {
      toast.error("Something went wrong while fetching products");
    }
  }, [dispatch, pathname, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleEnquiryClick = (id) => {
    navigate(`product-details/${id}`, { state: { from: pathname } });
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={
            pathname === "/dashboard/local-shops" ? "Local Businesses" : "View Manufacturers"
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
                <input type="text" className="form-control" placeholder="location" required />
                <img src={locationBlack} alt="location" className="location-icon" />
              </div>
              <div className="sort-box" id="sortBox">
                <div className="sort-toggle">
                  <span>
                    <span className="sort-label">Sort</span>
                    <img src={sortArrowDown} alt="Sort Icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-grid">
            {loading ? (
              <ClassifiedSectionSkeleton />
            ) : products.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>No products available.</p>
            ) : (
              products.map((product) => (
                <div
                  className="product-card"
                  onClick={() => handleEnquiryClick(product._id)}
                  key={product._id}
                >
                  <div className="image-part">
                    <img
                      src={product.productImage?.[0] || productImage}
                      alt={product.productName || "Product"}
                    />
                  </div>
                  <div className="card-text-part">
                    <h6 className="normal-heading">{product.productName}</h6>
                    <p className="normal-para">Vendor: {product?.providerDetails?.name || "N/A"}</p>
                    <p className="normal-para">
                      {product?.providerDetails?.address || "Address not available"}
                    </p>
                  </div>
                  <div className="available-service-btn" style={{ marginTop: "auto" }}>
                    <button className="send-btn">View Business</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && products.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Commonpagination
                ActivePage={listingPagePaginationData?.page || 1}
                ItemsCountPerPage={10}
                TotalItemsCount={listingPagePaginationData?.total || 0}
                pageRangeDisplayed={3}
                Onchange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocalProductsListingModule;

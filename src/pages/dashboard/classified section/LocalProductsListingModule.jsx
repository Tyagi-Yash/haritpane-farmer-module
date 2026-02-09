import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../assets/images/product-image.png";

import TopbarModal from "../../../components/common components/TopbarModal";
import ClassifiedSectionSkeleton from "../../../components/skeletons/ClassifiedSectionSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";
import LocationInput from "../../../components/common components/LocationInput";

import { getAllProductsForFarmer } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";

function LocalProductsListingModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { loading, products, listingPagePaginationData } = useSelector(
    (state) => state.services.ClassifiedSectionMgmtSlice,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Top Rated");
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const [draftLocation, setDraftLocation] = useState({
    address: "",
    lat: null,
    lng: null,
  });

  const [appliedLocation, setAppliedLocation] = useState({
    lat: null,
    lng: null,
  });

  const loadProducts = useCallback(async () => {
    try {
      const params = {
        createdBy: pathname === "/dashboard/local-shops" ? "just_dial" : "india_mart",
        page: currentPage,
      };

      if (selectedSort === "Top Rated") {
        params.sortBy = "desc";
      }

      if (selectedSort === "Location" && appliedLocation.lat && appliedLocation.lng) {
        params.lat = appliedLocation.lat;
        params.lng = appliedLocation.lng;
      }

      await dispatch(getAllProductsForFarmer(params)).unwrap();
    } catch {
      toast.error("Unable to load products");
    }
  }, [dispatch, pathname, currentPage, selectedSort, appliedLocation.lat, appliedLocation.lng]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const toggleSortMenu = () => setIsSortOpen((prev) => !prev);

  const selectTopRated = () => {
    setSelectedSort("Top Rated");
    setShowLocationFilter(false);
    setDraftLocation({ address: "", lat: null, lng: null });
    setAppliedLocation({ address: "", lat: null, lng: null });
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const selectLocation = () => {
    setSelectedSort("Location");
    setShowLocationFilter(true);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const handleSelectLocation = ({ address, lat, lng }) => {
    setDraftLocation({ address, lat, lng });
  };

  const handleApplyLocation = () => {
    if (!draftLocation.lat || !draftLocation.lng) {
      toast.error("Please select a valid location");
      return;
    }

    setAppliedLocation({
      lat: draftLocation.lat,
      lng: draftLocation.lng,
    });

    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
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
          titleBox
          title={pathname === "/dashboard/local-shops" ? "Local Businesses" : "View Manufacturers"}
          navigate="/dashboard"
        />

        <div className="dashboard local-shops">
          <div className="product-filter-area">
            <h6 className="book-heading">Products</h6>

            <div className="search-sort">
              {showLocationFilter && (
                <>
                  <LocationInput
                    value={draftLocation.address}
                    onChange={(val) => setDraftLocation((prev) => ({ ...prev, address: val }))}
                    onSelectLocation={handleSelectLocation}
                    placeholder="Enter Location"
                  />

                  <button className="call-us-edit me-4" onClick={handleApplyLocation}>
                    Apply Location
                  </button>
                </>
              )}

              <div className="sort-box">
                <div className="sort-toggle" onClick={toggleSortMenu}>
                  <span className="sort-label">{selectedSort}</span>
                  <img src={sortArrowDown} alt="Sort" />
                </div>

                {isSortOpen && (
                  <div className="sort-menu">
                    <div className="sort-option" onClick={selectTopRated}>
                      Top Rated
                    </div>
                    <div className="sort-option" onClick={selectLocation}>
                      Location
                    </div>
                  </div>
                )}
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
                  <div className="available-service-btn mt-auto">
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

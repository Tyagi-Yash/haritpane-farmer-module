import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../assets/images/product-image.png";

import TopbarModal from "../../../components/common components/TopbarModal";
import ClassifiedSectionSkeleton from "../../../components/skeletons/ClassifiedSectionSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";

import { getAllProductsForFarmer } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";
import { formatPrice } from "../../../utils/formatPrice";

function LocalProductsListingModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { loading, products, listingPagePaginationData } = useSelector(
    (state) => state.services.ClassifiedSectionMgmtSlice,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const loadProducts = useCallback(async () => {
    try {
      const params = {
        createdBy: pathname === "/dashboard/local-shops" ? "just_dial" : "india_mart",
        page: currentPage,
      };

      if (selectedSort === "Top Rated") {
        params.sortBy = "desc";
      }

      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      await dispatch(getAllProductsForFarmer(params)).unwrap();
    } catch {
      toast.error(t("classified.unableToLoad"));
    }
  }, [dispatch, pathname, currentPage, selectedSort, searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const toggleSortMenu = () => setIsSortOpen((prev) => !prev);

  const selectTopRated = () => {
    setSelectedSort("Top Rated");
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const selectDefault = () => {
    setSelectedSort("");
    setCurrentPage(1);
    setIsSortOpen(false);
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
          title={
            pathname === "/dashboard/local-shops"
              ? t("classified.localBusinesses")
              : t("classified.viewManufacturers")
          }
          navigate="/dashboard"
        />

        <div className="dashboard local-shops">
          <div className="product-filter-area">
            <h6 className="book-heading">{t("classified.products")}</h6>

            <div className="search-sort">
              <div className="search-bar me-3" style={{ position: "relative", width: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("classified.searchPlaceholder")}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "12px",
                    width: "100%",
                  }}
                />
              </div>

              <div className="sort-box">
                <div className="sort-toggle" onClick={toggleSortMenu}>
                  <span className="sort-label">
                    {selectedSort === "Top Rated"
                      ? t("classified.topRated")
                      : t("classified.sortBy")}
                  </span>
                  <img src={sortArrowDown} alt="Sort" />
                </div>

                {isSortOpen && (
                  <div className="sort-menu">
                    {selectedSort === "Top Rated" ? (
                      <div
                        className="sort-option"
                        style={{ fontWeight: "400" }}
                        onClick={selectDefault}
                      >
                        {t("classified.reset")}
                      </div>
                    ) : (
                      <div className="sort-option" onClick={selectTopRated}>
                        {t("classified.topRated")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="product-grid">
            {loading ? (
              <ClassifiedSectionSkeleton />
            ) : products.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>{t("classified.noProducts")}</p>
            ) : (
              products.map((product) => {
                const businessAddress =
                  [
                    product?.providerDetails?.businInfo?.buildingName,
                    product?.providerDetails?.businInfo?.street,
                    product?.providerDetails?.businInfo?.city,
                    product?.providerDetails?.businInfo?.state,
                    product?.providerDetails?.businInfo?.pinCode,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  product?.providerDetails?.address ||
                  t("classified.addressNotAvailable");

                return (
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
                      <p className="normal-para">
                        {t("common.businessName")}:{" "}
                        {product?.providerDetails?.businInfo?.businessName ||
                          product?.providerDetails?.name ||
                          "N/A"}
                      </p>
                      <p className="normal-para">
                        {t("classified.location")}: {businessAddress}
                      </p>
                      {product?.providerDetails?.selectedCategogyJD?.length > 0 && (
                        <p className="normal-para">
                          {t("classified.category")}:{" "}
                          {product?.providerDetails?.selectedCategogyJD?.[0]}
                        </p>
                      )}
                      {product?.providerDetails?.otherCategoryJD?.length > 0 && (
                        <p className="normal-para">
                          {t("classified.subCategory")}:{" "}
                          {product?.providerDetails?.otherCategoryJD?.[0]}
                        </p>
                      )}
                    </div>
                    <div className="available-service-btn mt-auto">
                      <button className="send-btn">{t("classified.viewBusiness")}</button>
                    </div>
                  </div>
                );
              })
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

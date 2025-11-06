import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import locationBlack from "../../../assets/images/location-black.svg";
import sortArrowDown from "../../../assets/images/sort-arrow-down.svg";
import productImage from "../../../assets/images/product-image.png";
import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllProductsForFarmer } from "../../../reduxtoolkit/slices/dashboard/classifiedSection";
import ClassifiedSectionSkeleton from "../../../components/skeletons/ClassifiedSectionSkeleton";
import { Commonpagination } from "../../../components/common components/Commonpagination";

function LocalProductsListingModule() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    page: 1,
    isNext: false,
    isPrev: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort");

  const toggleSortMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const selectSortOption = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadProducts = async (pageNumber = 1) => {
    setLoading(true);
    const paramData = {
      createdBy: pathname === "/dashboard/local-shops" ? "just_dial" : "india_mart",
      page: pageNumber,
    };

    try {
      const res = await dispatch(getAllProductsForFarmer(paramData));
      const { status, data } = res?.payload || {};

      if (status === 200) {
        const metadata = data?.data?.[0]?.metadata?.[0] || {};
        setProducts(data?.data?.[0]?.data || []);
        setPaginationData(metadata);
      } else {
        toast(data?.message || "Failed to load Products");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(activePage);
  }, [pathname, activePage]);

  const handleEnquiryClick = (id) => {
    navigate(`product-details/${id}`, {
      state: { from: pathname },
    });
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
                <input type="text" className="form-control" placeholder="location" required />
                <img src={locationBlack} alt="" className="location-icon" />
              </div>
              <div className="sort-box" id="sortBox">
                <div className="sort-toggle" onClick={toggleSortMenu}>
                  <span>
                    <span className="sort-label">{selectedSort}</span>
                    <img src={sortArrowDown} alt="Sort Icon" />
                  </span>
                </div>
                {isOpen && (
                  <div className="sort-menu">
                    <div className="sort-option" onClick={() => selectSortOption("Top rating")}>
                      Top rating
                    </div>
                    <div className="sort-option" onClick={() => selectSortOption("Out of Radius")}>
                      Out of Radius
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <ClassifiedSectionSkeleton />
            ) : products.length === 0 ? (
              <p style={{ color: "gray", marginTop: "10px" }}>No product Available.</p>
            ) : (
              products.map((product) => (
                <div className="col-md-4 mb-3" key={product._id}>
                  <div className="product-card" onClick={() => handleEnquiryClick(product._id)}>
                    <div className="image-part">
                      <img
                        src={product.productImage?.[0] || productImage}
                        alt={product.productName || "Product"}
                      />
                    </div>
                    <div className="card-text-part">
                      <h6 className="normal-heading">{product.productName}</h6>
                      <p className="normal-para">Vendor Name: {product?.provider?.name || "N/A"}</p>
                      <p className="normal-para">
                        {product?.provider?.address || "Address not Available"}
                      </p>
                    </div>
                    <div className="available-service-btn">
                      <button className="send-btn">View Business</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {!loading && products.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Commonpagination
                ActivePage={paginationData?.page || 1}
                ItemsCountPerPage={10}
                TotalItemsCount={paginationData?.total || 0}
                PageRangeDisplayed={5}
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

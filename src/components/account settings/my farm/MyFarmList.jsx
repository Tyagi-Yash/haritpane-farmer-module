import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import editRectangle from "../../../assets/images/edit-rectangle.svg";
import view from "../../../assets/images/view.svg";
import trash from "../../../assets/images/trash.svg";
import farm1 from "../../../assets/images/farm1.jpg";
import farm2 from "../../../assets/images/farm2.jpg";
import farm3 from "../../../assets/images/farm3.jpg";
import { deleteMyFarm } from "../../../reduxtoolkit/slices/account settings/myFarm";
import DeleteFarmModal from "./DeleteFarmModal";
import { Commonpagination } from "../../common components/Commonpagination";

function MyFarmList({ farms = [], pagination = {}, onPageChange = () => {} }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);

  const farmImages = [farm1, farm2, farm3];

  const handleEdit = (farm) => {
    navigate("/my-farms/map", { state: { farm } });
  };

  const handleView = (farm) => {
    navigate("/my-farms/details", { state: { farm } });
  };

  const handleDelete = (farm) => {
    setSelectedFarm(farm);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedFarm) {
      dispatch(deleteMyFarm({ farmId: selectedFarm._id }));
      setShowDeleteModal(false);
      setSelectedFarm(null);
    }
  };

  return (
    <>
      <div className="dashboard my-farms-cards my-maps-card-sections">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">My Fields</h4>

          <button
            className="btn btn-success d-flex align-items-center gap-2 px-3"
            style={{ backgroundColor: "#FAA625", color: "#fff", border: "none" }}
            onClick={() => navigate("/my-farms/map")}
          >
            <i className="fa fa-plus"></i>
            Add Field
          </button>
        </div>

        <div className="row">
          {farms.map((farm, index) => {
            const farmImg = farmImages[index % farmImages.length];

            return (
              <div className="col-md-4 mb-3" key={farm._id || farm.farmName}>
                <div className="farm-card-view">
                  <figure className="maps-scroll" style={{ position: "relative", height: "220px" }}>
                    <img
                      src={farmImg}
                      alt={farm.farmName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Overlay to disable interaction */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                      }}
                    ></div>
                  </figure>

                  <div className="name-icon d-flex justify-content-between align-items-center px-2 py-2">
                    <h6 className="mb-0">{farm.farmName}</h6>

                    <div className="d-flex gap-2">
                      <button className="icon-btn" onClick={() => handleView(farm)}>
                        <img src={view} alt="view" />
                      </button>

                      <button className="icon-btn" onClick={() => handleEdit(farm)}>
                        <img src={editRectangle} alt="edit" />
                      </button>

                      <button className="icon-btn" onClick={() => handleDelete(farm)}>
                        <img src={trash} alt="trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DeleteFarmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
          farmName={selectedFarm?.farmName}
        />
      </div>
      {pagination.total > 0 && (
        <div className="d-flex justify-content-center mt-4 mb-5">
          <Commonpagination
            ActivePage={pagination.page}
            TotalItemsCount={pagination.total}
            ItemsCountPerPage={pagination.limit}
            Onchange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

export default MyFarmList;

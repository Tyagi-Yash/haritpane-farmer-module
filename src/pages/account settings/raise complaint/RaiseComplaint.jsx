import TopbarModal from "../../../components/common components/TopbarModal";
import { useComplaints } from "../../../hooks/useComplaints";

import ComplaintHeader from "../../../components/account settings/complaint/ComplaintHeader";
import ComplaintTable from "../../../components/account settings/complaint/ComplaintTable";
import ComplaintModal from "../../../components/account settings/complaint/ComplaintModal";
import ComplaintDetailModal from "../../../components/account settings/complaint/ComplaintDetailModal";
import ComplaintEmptyState from "../../../components/account settings/complaint/ComplaintEmptyState";

function RaiseComplaint() {
  const {
    complaints,
    pagination,
    complaintDetail,
    loader,
    showModal,
    showDetailModal,
    loading,
    form,
    errors,
    currentPage,
    setCurrentPage,
    handleFormChange,
    openModal,
    closeModal,
    openDetailModal,
    closeDetailModal,
    handleSubmit,
    formatDate,
    t,
  } = useComplaints();

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal
          titleBox={true}
          title={t("complaint.pageTitle") || "Raise a Complaint"}
          navigate="/dashboard"
        />

        <div className="dashboard">
          <div className="complaint-page">
            <ComplaintHeader
              title={t("complaint.myComplaints") || "My Complaints"}
              sub={t("complaint.mySub") || "Raise complaints and track their status easily"}
              onRaiseClick={openModal}
              raiseBtnText={t("complaint.raiseBtn") || "Raise Complaint"}
            />

            {loader && complaints.length === 0 ? (
              <div className="complaint-loader-wrap">
                <div className="complaint-spinner-large" />
              </div>
            ) : complaints.length > 0 ? (
              <ComplaintTable
                complaints={complaints}
                currentPage={currentPage}
                formatDate={formatDate}
                onViewDetails={openDetailModal}
                pagination={pagination}
                setCurrentPage={setCurrentPage}
              />
            ) : (
              <ComplaintEmptyState />
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <ComplaintModal
          onClose={closeModal}
          loading={loading}
          onSubmit={handleSubmit}
          form={form}
          errors={errors}
          handleChange={handleFormChange}
          title={t("complaint.modalTitle") || "Raise Complaint"}
          sub={t("complaint.modalSub") || "Tell us what issue you are facing."}
        />
      )}

      {showDetailModal && (
        <ComplaintDetailModal
          onClose={closeDetailModal}
          complaint={complaintDetail}
          loader={loader}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

export default RaiseComplaint;

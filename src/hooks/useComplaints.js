import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  createComplain,
  getAllComplaints,
  getComplaintById,
  clearComplaintDetail,
} from "../reduxtoolkit/slices/account settings/complain";
import { formatDate } from "../utils/dateFormatter";

export const useComplaints = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { complaints, pagination, complaintDetail, loader } = useSelector(
    (state) => state.services.complainSlice
  );

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ complain: "", description: "" });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch complaints whenever currentPage changes
  useEffect(() => {
    dispatch(getAllComplaints({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.complain.trim())
      errs.complain = t("complaint.complainRequired") || "Complaint title is required";
    if (!form.description.trim())
      errs.description = t("complaint.descriptionRequired") || "Description is required";
    return errs;
  }, [form, t]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const openModal = () => {
    setForm({ complain: "", description: "" });
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    if (loading) return;
    setShowModal(false);
  };

  const openDetailModal = async (id) => {
    await dispatch(getComplaintById(id));
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    dispatch(clearComplaintDetail());
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(createComplain(form));
      const status = res?.payload?.status;
      if (status === 200 || status === 201) {
        toast.success(t("complaint.submitSuccess") || "Complaint submitted successfully");
        setShowModal(false);
        // Force list back to first page to see the newest complaint
        if (currentPage === 1) {
          dispatch(getAllComplaints({ page: 1, limit: 10 }));
        } else {
          setCurrentPage(1);
        }
      } else {
        toast.error(t("complaint.submitFail") || "Failed to submit complaint. Please try again.");
      }
    } catch {
      toast.error(t("common.somethingWentWrong") || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
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

    // Handlers
    setCurrentPage,
    handleFormChange,
    openModal,
    closeModal,
    openDetailModal,
    closeDetailModal,
    handleSubmit,
    formatDate,
    t,
  };
};

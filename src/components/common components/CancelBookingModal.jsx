import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import sortArrowDown from "../../assets/images/sort-arrow-down.svg";

const CancelBookingModal = ({ show, onClose, onCancel, status, reasons = [] }) => {
  const { t } = useTranslation();
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { loading } = useSelector((state) => state.services.bookingSlice);

  const isStarted = status === "started";

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectReasonOption = (value) => {
    setSelectedReason(value);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    let finalReason = "";

    if (isStarted) {
      if (selectedReason === "Other") {
        finalReason = customReason;
      } else {
        finalReason = selectedReason;
      }
    } else {
      finalReason = customReason;
    }

    onCancel(finalReason);

    setSelectedReason("");
    setCustomReason("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".sort-box")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Modal
      className="Logout-modal"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <div className="text-muted modal-title">{t("progress.cancelBookingUndoWarn")}</div>
        {isStarted && reasons.length > 0 && (
          <div className="mb-3">
            <div className="sort-box" style={{ width: "100%" }}>
              <div className={`sort-toggle ${isOpen ? "open" : ""}`} onClick={toggleDropdown}>
                <span>
                  <span className="sort-label">
                    {selectedReason
                      ? selectedReason === "Other"
                        ? t("progress.otherReason")
                        : t(`progress.reasons.${selectedReason}`)
                      : t("progress.selectReason")}
                  </span>
                  <i className={`fa fa-chevron-down dropdown-icon ${isOpen ? "rotate" : ""}`}></i>
                </span>
              </div>

              {isOpen && (
                <div className="sort-menu">
                  {[...reasons, "Other"].map((item) => (
                    <div
                      key={item}
                      className={"sort-option"}
                      onClick={() => selectReasonOption(item)}
                      style={{ fontWeight: "400" }}
                    >
                      {item === "Other" ? t("progress.otherReason") : t(`progress.reasons.${item}`)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {(!isStarted || selectedReason === "Other") && (
          <textarea
            className="cancilation-input"
            rows={3}
            placeholder={t("progress.cancelReasonPlaceholder")}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        )}
        <div className="modal-footer">
          <button
            className="btn btn-logout-modal"
            disabled={
              loading ||
              (isStarted
                ? !selectedReason || (selectedReason === "Other" && !customReason.trim())
                : !customReason.trim())
            }
            onClick={handleSubmit}
            style={{ width: "200px" }}
          >
            {loading ? t("progress.cancelling") : t("progress.cancelBooking")}
          </button>

          <button className="btn btn-cancel" onClick={handleClose}>
            {t("progress.keepBooking")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CancelBookingModal;

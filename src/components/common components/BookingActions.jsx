import { useTranslation } from "react-i18next";

const BookingActions = ({ isBooking, loading, onBook, onCancelClick }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-end align-items-center mt-4">
      {/* {!isBooking ? ( */}
      <button onClick={onBook} disabled={loading} className="btn-edit">
        {loading ? t("common.booking") : t("common.sendBookingRequest")}
      </button>
      {/* ) : (
        <>
          <button type="button" className="btn-delete" disabled={loading} onClick={onCancelClick}>
            {loading ? t("common.cancelling") : t("common.cancelBooking")}
          </button>
          <button className="btn-edit">{t("common.raiseEnquiry")}</button>
        </>
      )} */}
    </div>
  );
};

export default BookingActions;

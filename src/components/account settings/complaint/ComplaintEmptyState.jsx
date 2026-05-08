import { useTranslation } from "react-i18next";
import complaintImg from "../../../assets/images/complaint.svg";

const ComplaintEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="complaint-list-placeholder">
      <div className="complaint-list-placeholder__inner">
        <img src={complaintImg} alt="No complaints" className="complaint-list-placeholder__img" />
        <h4>{t("complaint.noComplaints")}</h4>
        <p>{t("complaint.noComplaintsText")}</p>
      </div>
    </div>
  );
};

export default ComplaintEmptyState;

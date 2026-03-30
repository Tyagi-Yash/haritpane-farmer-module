import { useTranslation } from "react-i18next";

const VendorTabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <div className="CommonTabs mt-0">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "service" ? "active" : ""}`}
            onClick={() => setActiveTab("service")}
          >
            {t("common.serviceDetails")}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            {t("common.reviewAndRating")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VendorTabs;

const VendorTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="CommonTabs mt-0">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "service" ? "active" : ""}`}
            onClick={() => setActiveTab("service")}
          >
            Service Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            Review & Rating
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VendorTabs;

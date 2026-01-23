import TopbarModal from "../../components/common components/TopbarModal";

const QuotationDetails = () => {
  const job = {
    name: "Shubham Sharma",
    phone: "98789682234",
    dateTime: "20-01-2026, 12:20 PM",
    vehicleType: "Tractor",
    goods: "Sugarcane",
    location: "Noida",
    charges: 400,
  };

  const quotations = [
    { id: 1, providerName: "Yash", amount: 400 },
    { id: 2, providerName: "John", amount: 1000 },
    { id: 3, providerName: "Yash", amount: 400 },
    { id: 4, providerName: "John", amount: 1000 },
    { id: 5, providerName: "Yash", amount: 400 },
    { id: 6, providerName: "John", amount: 1000 },
    { id: 7, providerName: "Yash", amount: 400 },
    { id: 8, providerName: "John", amount: 1000 },
  ];

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title="Job Order Details" navigate="/service-tracking" />
        <div className="quotation-wrapper">
          <div className="job-info">
            <Info label="Name" value={job.name} />
            <Info label="Phone Number" value={job.phone} />
            <Info label="Date & Time" value={job.dateTime} />
            <Info label="Vehicle Type" value={job.vehicleType} />
            <Info label="Goods to be Transported" value={job.goods} />
            <Info label="End Travel Location" value={job.location} />
            <Info label="Charges" value={`₹ ${job.charges}`} />
          </div>

          <h3 className="section-title">Quotation</h3>

          <div className="quotation-grid">
            {quotations.map((q) => (
              <div className="quotation-card" key={q.id}>
                <div className="quotation-row">
                  <span className="quotation-label">Service Provider Name</span>
                  <span className="quotation-value">{q.providerName}</span>
                </div>

                <div className="quotation-row amount-row">
                  <span className="quotation-label">Amount</span>
                  <span className="amount">₹ {q.amount}</span>
                </div>

                <div className="action-buttons">
                  <button className="quotation-btn accept">Accept</button>

                  <button className="quotation-btn reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="quotation-row">
    <span className="quotation-label">{label}</span>
    <span className="quotation-value">{value || "-"}</span>
  </div>
);

export default QuotationDetails;

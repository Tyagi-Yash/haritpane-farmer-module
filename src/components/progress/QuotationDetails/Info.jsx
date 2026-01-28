function Info({ label, value }) {
  return (
    <div className="quotation-row">
      <span className="quotation-label">{label}</span>
      <span className="quotation-value">{value || "-"}</span>
    </div>
  );
}

export default Info;

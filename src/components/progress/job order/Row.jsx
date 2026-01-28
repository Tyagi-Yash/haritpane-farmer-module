function Row({ label, value }) {
  return (
    <div className="joborder-row">
      <span className="joborder-label">{label}</span>
      <span className="joborder-value">{value || "-"}</span>
    </div>
  );
}

export default Row;

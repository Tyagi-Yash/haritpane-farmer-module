const PriceBreakdown = ({ info }) => {
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const ratePerTon = Number(info ?? 0);

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">Service Charges</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>Per Ton</td>
            <td>{formatPrice(ratePerTon)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceBreakdown;

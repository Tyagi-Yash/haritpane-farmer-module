const PriceBreakdown = ({ perMeter, payableAmount, height, length }) => {
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const ratePerMeter = Number(perMeter ?? 0);
  const heightInFeet = Number(height ?? 0);
  const lengthInMeter = Number(length ?? 0);

  const heightInMeter = heightInFeet * 0.3048;
  const totalArea = heightInMeter * lengthInMeter;
  const serviceAmount = ratePerMeter > 0 ? totalArea * ratePerMeter : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">Tentative cost</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Dimensions
              <div className="text-muted small">
                Height: {heightInMeter} m ({heightInFeet.toFixed(2)} ft) × Length:{" "}
                {lengthInMeter.toFixed(2)} m
              </div>
            </td>
            <td>{totalArea.toFixed(2)} m²</td>
            <td></td>
          </tr>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerMeter)} (Per m²) × {totalArea.toFixed(2)} m²
              </div>
            </td>
            <td>{formatPrice(serviceAmount)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="fw-bold border-top">
            <td>Total Payable Amount</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

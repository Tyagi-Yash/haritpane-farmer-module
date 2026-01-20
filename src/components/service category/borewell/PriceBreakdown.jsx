const PriceBreakdown = ({ info, additionalCharges, extraCharges, payableAmount }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const boreRatePerFt = Number(info?.boreDigging ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;

  const boreAmount = extraCharges
    ? Number(payableAmount ?? 0) - transportCharge
    : Number(payableAmount ?? 0);

  const depthOfBorewell = boreRatePerFt > 0 ? boreAmount / boreRatePerFt : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Bore Digging Charges
              <div className="text-muted small">
                {formatPrice(boreRatePerFt)} (Per Ft) × {depthOfBorewell.toFixed(2)} ft
              </div>
            </td>
            <td>{formatPrice(boreAmount)}</td>
          </tr>

          <tr>
            <td>Transportation Charges</td>
            <td>{formatPrice(transportCharge)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="fw-bold border-top">
            <td>Total Amount to Pay</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

const PriceBreakdown = ({
  boreDigging,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const boreRatePerFt = Number(boreDigging ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const boreAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
    : Number(payableAmount ?? 0);

  const depthOfBorewell = boreRatePerFt > 0 ? boreAmount / boreRatePerFt : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Tentative cost</h5>

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
            <td>
              Transportation Charges
              {!!transportCharge && (
                <div className="text-muted small">
                  {formatPrice(transportCharge)} (Per Km) × {distanceBeyondRadius?.toFixed(2)} Km
                </div>
              )}
            </td>
            <td>{formatPrice(OveralltransportCharge)}</td>
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

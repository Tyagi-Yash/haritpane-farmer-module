const PriceBreakdown = ({
  chargePerAcre,
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

  const ratePerAcre = Number(chargePerAcre ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
    : Number(payableAmount ?? 0);

  const area = ratePerAcre > 0 ? serviceAmount / ratePerAcre : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerAcre)} (Per Acre) × {area.toFixed(2)} acres
              </div>
            </td>
            <td>{formatPrice(serviceAmount)}</td>
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

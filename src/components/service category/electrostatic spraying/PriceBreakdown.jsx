const PriceBreakdown = ({
  info,
  additionalCharges,
  extraCharges,
  payableAmount,
  areaUnderCultivation,
}) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const ratePerAcre = Number(info?.chargePerAcre ?? 0);
  const area = Number(areaUnderCultivation ?? 0);

  const serviceCost = ratePerAcre * area;

  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerAcre)} (Per Acre) × {area} acres
              </div>
            </td>
            <td>{formatPrice(serviceCost)}</td>
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

const PriceBreakdown = ({ info, additionalCharges, extraCharges, payableAmount }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const ratePerAcre = Number(info ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - transportCharge
    : Number(payableAmount ?? 0);

  const areaUnderCultivation = ratePerAcre > 0 ? serviceAmount / ratePerAcre : 0;

  const serviceCost = ratePerAcre * areaUnderCultivation;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerAcre)} (Per Acre) × {areaUnderCultivation.toFixed(2)} acres
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

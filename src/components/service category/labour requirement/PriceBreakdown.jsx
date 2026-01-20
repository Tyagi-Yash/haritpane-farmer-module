const PriceBreakdown = ({ info, additionalCharges, extraCharges, payableAmount }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const dailyWage = Number(info?.dailyWage ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - transportCharge
    : Number(payableAmount ?? 0);

  const numberOfLabour = dailyWage > 0 ? serviceAmount / dailyWage : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(dailyWage)} (Per Person Daily Wages) × {numberOfLabour.toFixed(0)}{" "}
                labour
              </div>
            </td>
            <td>{formatPrice(serviceAmount)}</td>
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

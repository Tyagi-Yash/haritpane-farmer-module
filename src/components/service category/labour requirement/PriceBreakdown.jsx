const PriceBreakdown = ({
  dailyWage,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  dailyWage = Number(dailyWage ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
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

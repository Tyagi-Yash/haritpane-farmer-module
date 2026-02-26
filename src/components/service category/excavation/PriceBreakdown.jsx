import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({
  price,
  priceType,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  price = Number(price ?? 0);
  const payable = Number(payableAmount ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;
  const serviceAmount = extraCharges ? payable - OveralltransportCharge : payable;
  const units = price > 0 ? serviceAmount / price : 0;

  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              {priceType === "Hourly" && (
                <div className="text-muted small">
                  {formatPrice(price)} (per Hour) × {formatHoursMinutes(units)}
                </div>
              )}
              {priceType === "Daily" && (
                <div className="text-muted small">
                  {formatPrice(price)} (per Day) × {units} day
                  {units > 1 ? "s" : ""}
                  <div className="text-muted small">
                    * Daily charges are calculated by rounding total duration to full days.
                  </div>
                </div>
              )}
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
            <td>{formatPrice(payable)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

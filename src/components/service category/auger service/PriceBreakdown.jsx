import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({
  ratePerHr,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  ratePerHr = Number(ratePerHr ?? 0);
  const payable = Number(payableAmount ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const billableHours = ratePerHr > 0 ? (payable - OveralltransportCharge) / ratePerHr : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerHr)} (Per Hour) × {formatHoursMinutes(billableHours)}
              </div>
            </td>
            <td>{formatPrice(payable - OveralltransportCharge)}</td>
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

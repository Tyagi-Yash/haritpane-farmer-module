import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({ info, additionalCharges, extraCharges, payableAmount }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const ratePerHr = Number(info ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;

  const billableHours = ratePerHr > 0 ? payableAmount / ratePerHr : 0;

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
            <td>{formatPrice(payableAmount - transportCharge)}</td>
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

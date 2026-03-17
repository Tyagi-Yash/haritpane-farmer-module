import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({
  ratePerHr,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
  drillInfo = [],
}) => {
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  ratePerHr = Number(ratePerHr ?? 0);
  const payable = Number(payableAmount ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const billableHours = ratePerHr > 0 ? (payable - OveralltransportCharge) / ratePerHr : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      {drillInfo.length > 0 && (
        <div className="mt-3">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Drill Information</th>
              </tr>
            </thead>
            <tbody>
              {drillInfo.map((drill) => (
                <tr key={drill?._id || drill.drillInfoId}>
                  <td className="no-border">
                    {drill.drillDiameter}" ₹ {Number(drill.ratePerInch).toFixed(2)}/feet
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h5 className="normal-heading">Tentative cost</h5>

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

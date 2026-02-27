const PriceBreakdown = ({
  boreDigging,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
  motorInfo = [],
  pipeCharges,
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
  const overallTransportCharge = transportCharge * Number(distanceBeyondRadius ?? 0);

  const boreAmount = extraCharges
    ? Number(payableAmount ?? 0) - overallTransportCharge
    : Number(payableAmount ?? 0);

  const depthOfBorewell = boreRatePerFt > 0 ? boreAmount / boreRatePerFt : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      {(motorInfo.length > 0 || pipeCharges) && (
        <>
          <h5 className="normal-heading">Motor & Pipe Details</h5>
          <table className="table table-sm mb-4">
            <tbody>
              {motorInfo.length > 0 &&
                motorInfo.map((motor) => (
                  <tr key={motor?._id}>
                    <td>Motor {motor.motorPower || "-"} HP</td>
                    <td>{motor.motorCost ? formatPrice(motor.motorCost) : "-"}</td>
                  </tr>
                ))}

              {pipeCharges && (
                <tr>
                  <td>Casing Pipe Charges</td>
                  <td>{formatPrice(pipeCharges)} /ft</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      <br />

      <h5 className="normal-heading" >Tentative Cost</h5>

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

          {transportCharge > 0 && (
            <tr>
              <td>
                Transportation Charges
                <div className="text-muted small">
                  {formatPrice(transportCharge)} (Per Km) ×{" "}
                  {Number(distanceBeyondRadius ?? 0).toFixed(2)} Km
                </div>
              </td>
              <td>{formatPrice(overallTransportCharge)}</td>
            </tr>
          )}
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

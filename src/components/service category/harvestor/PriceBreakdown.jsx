const PriceBreakdown = ({
  info,
  additionalCharges,
  extrachages,
  payableAmount,
  areaUnderCultivation,
}) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const ratePerAcre = Number(info?.price ?? 0);
  const area = Number(areaUnderCultivation ?? 0);
  const serviceTotal = ratePerAcre * area;
  const transportCharge = extrachages ? additionalCharges : 0;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              Service Charges
              <div className="text-muted small">
                {formatPrice(ratePerAcre)}(Per Acre) × {area} acres
              </div>
            </td>
            <td>{formatPrice(serviceTotal)}</td>
          </tr>

          <tr>
            <td>Transportation Charges</td>
            <td>{formatPrice(transportCharge)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>Total Amount to Pay</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

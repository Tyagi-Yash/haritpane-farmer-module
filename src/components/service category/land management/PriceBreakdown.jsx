const PriceBreakdown = ({
  info,
  extraCharges,
  additionalCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;
  const transportCharge = extraCharges ? additionalCharges : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>Service Charges ({info?.priceType})</td>
            <td>{formatPrice(info?.price)}</td>
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

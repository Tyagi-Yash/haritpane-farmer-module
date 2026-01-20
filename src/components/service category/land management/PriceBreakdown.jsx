const PriceBreakdown = ({ info, extraCharges, additionalCharges, payableAmount }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;
  const transportCharge = extraCharges ? additionalCharges : 0;

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

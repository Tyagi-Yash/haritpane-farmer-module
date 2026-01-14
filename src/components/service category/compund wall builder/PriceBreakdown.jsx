const PriceBreakdown = ({ info, additionalCharges, payableAmount }) => {
  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>Service Cost (per square ft)</td>
            <td>₹ {Number(info?.rate ?? 0).toFixed(2)}</td>
          </tr>

          {additionalCharges && (
            <tr>
              <td>Transportation Charges</td>
              <td>₹ {Number(additionalCharges).toFixed(2)}</td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <td>Total Payable Amount</td>
            <td>₹ {Number(payableAmount ?? 0).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

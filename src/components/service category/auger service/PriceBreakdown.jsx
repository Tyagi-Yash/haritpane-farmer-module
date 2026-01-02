const PriceBreakdown = ({ info, additionalCharges, payableAmount }) => {
  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Total Booking Price</h5>

      <table className="table table-borderless">
        <tbody>
          {info.ratePerHr ? (
            <tr>
              <td>Service Cost(/hour)</td>
              <td>₹{Number(info?.ratePerHr ?? 0).toFixed(2)}</td>
            </tr>
          ) : info.drillInfo[0].ratePerInch ? (
            <tr>
              <td>Service Cost(/Running ft)</td>
              <td>₹{Number(info?.drillInfo?.[0]?.ratePerInch ?? 0).toFixed(2)}</td>
            </tr>
          ) : null}

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

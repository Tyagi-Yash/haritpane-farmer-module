const PriceBreakdown = ({ sellingPrice, payableAmount }) => {
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
            <td>Service Cost</td>
            <td>{formatPrice(sellingPrice ?? 0)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>Total Payable Amount</td>
            <td>{formatPrice(payableAmount ?? 0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

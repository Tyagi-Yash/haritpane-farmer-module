const PriceBreakdown = ({ info }) => {
  const formatPrice = (amount) => `₹ ${Number(amount ?? 0).toFixed(2)}`;

  const ratePerTon = Number(info ?? 0);

  return (
    <div className="option-wrapper bookingPriceTable">
      <h5 className="normal-heading">Service Charges</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>Per Ton</td>
            <td>{formatPrice(ratePerTon)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceBreakdown;

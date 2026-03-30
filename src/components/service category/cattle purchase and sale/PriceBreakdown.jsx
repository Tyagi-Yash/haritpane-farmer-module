import { useTranslation } from "react-i18next";

const PriceBreakdown = ({ sellingPrice, payableAmount }) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">{t("common.totalBookingPrice")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>{t("cattle.sellingPrice")}</td>
            <td>{formatPrice(sellingPrice ?? 0)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>{t("common.totalPayableAmount")}</td>
            <td>{formatPrice(payableAmount ?? 0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

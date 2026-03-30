import { useTranslation } from "react-i18next";

const PriceBreakdown = ({ perMeter, payableAmount, height, length }) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const ratePerMeter = Number(perMeter ?? 0);
  const heightInFeet = Number(height ?? 0);
  const lengthInMeter = Number(length ?? 0);

  const heightInMeter = heightInFeet * 0.3048;
  const totalArea = heightInMeter * lengthInMeter;
  const serviceAmount = ratePerMeter > 0 ? totalArea * ratePerMeter : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">{t("common.tentativeCost")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("common.dimensions")}
              <div className="text-muted small">
                {t("common.height")}: {heightInMeter.toFixed(2)} {t("common.meters")} (
                {heightInFeet.toFixed(2)} {t("common.feet")}) × {t("common.length")}:{" "}
                {lengthInMeter.toFixed(2)} {t("common.meters")}
              </div>
            </td>
            <td>
              {totalArea.toFixed(2)} {t("common.sqMeters")}
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              {t("common.serviceCharges")}
              <div className="text-muted small">
                {formatPrice(ratePerMeter)} ({t("common.perSqMeter")}) ×{" "}
                {totalArea.toFixed(2)} {t("common.sqMeters")}
              </div>
            </td>
            <td>{formatPrice(serviceAmount)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="fw-bold border-top">
            <td>{t("common.totalPayableAmount")}</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

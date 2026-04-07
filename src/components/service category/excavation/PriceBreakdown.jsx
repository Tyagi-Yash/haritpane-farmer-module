import { useTranslation } from "react-i18next";
import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({
  price,
  priceType,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const { t } = useTranslation();
  price = Number(price ?? 0);
  const payable = Number(payableAmount ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;
  const serviceAmount = extraCharges ? payable - OveralltransportCharge : payable;
  const units = price > 0 ? serviceAmount / price : 0;

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
            <td>
              {t("common.serviceCharges")}
              {priceType === "Hourly" && (
                <div className="text-muted small">
                  {formatPrice(price)} ({t("common.perHour")}) × {formatHoursMinutes(units, t)}
                </div>
              )}
              {priceType === "Daily" && (
                <div className="text-muted small">
                  {formatPrice(price)} ({t("common.perDay")}) × {units} {units > 1 ? t("common.days") : t("common.day")}
                  <div className="text-muted small">
                    {t("common.dailyChargesCalc")}
                  </div>
                </div>
              )}
            </td>
            <td>{formatPrice(serviceAmount)}</td>
          </tr>

          <tr>
            <td>
              {t("common.transportationCharges")}
              {!!transportCharge && (
                <div className="text-muted small">
                  {formatPrice(transportCharge)} ({t("common.perKm")}) × {distanceBeyondRadius?.toFixed(2)}{" "}
                  {t("common.km")}
                </div>
              )}
            </td>
            <td>{formatPrice(OveralltransportCharge)}</td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="fw-bold border-top">
            <td>{t("common.totalAmountToPay")}</td>
            <td>{formatPrice(payable)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

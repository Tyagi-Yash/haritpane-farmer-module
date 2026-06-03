import { useTranslation } from "react-i18next";

const PriceBreakdown = ({
  dailyWage,
  additionalCharges,
  extraCharges,
  payableAmount,
  numberOfLabour,
  distanceBeyondRadius,
  numberOfDays,
}) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const wage = Number(dailyWage ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const days = Number(numberOfDays ?? 1);
  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
    : Number(payableAmount ?? 0);

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">{t("common.totalBookingPrice")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("common.serviceCharges")}
              <div className="text-muted small">
                {formatPrice(wage)} ({t("common.perDay")}) × {numberOfLabour}{" "}
                {t("common.numberOfLabour")} × {days}{" "}
                {days > 1 ? t("common.days") : t("common.day")}
              </div>
            </td>
            <td>{formatPrice(serviceAmount)}</td>
          </tr>

          {transportCharge > 0 && (
            <tr>
              <td>
                {t("common.transportationCharges")}
                {!!transportCharge && (
                  <div className="text-muted small">
                    {formatPrice(transportCharge)} ({t("common.perKm")}) ×{" "}
                    {distanceBeyondRadius?.toFixed(2)} {t("common.km")}
                  </div>
                )}
                <div className="text-muted small">*Transportation charges may vary</div>
              </td>
              <td>{formatPrice(OveralltransportCharge)}</td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr className="fw-bold border-top">
            <td>{t("common.totalAmountToPay")}</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

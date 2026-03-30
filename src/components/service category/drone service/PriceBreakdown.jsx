import { useTranslation } from "react-i18next";

const PriceBreakdown = ({
  chargePerAcre,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
}) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const ratePerAcre = Number(chargePerAcre ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
    : Number(payableAmount ?? 0);

  const areaUnderCultivation = ratePerAcre > 0 ? serviceAmount / ratePerAcre : 0;

  const serviceCost = ratePerAcre * areaUnderCultivation;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">{t("common.totalBookingPrice")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("common.serviceCharges")}
              <div className="text-muted small">
                {formatPrice(ratePerAcre)} ({t("common.perAcre")}) × {areaUnderCultivation.toFixed(2)}{" "}
                {t("common.acres")}
              </div>
            </td>
            <td>{formatPrice(serviceCost)}</td>
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
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

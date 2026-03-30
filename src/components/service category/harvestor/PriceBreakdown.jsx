import { useTranslation } from "react-i18next";

const PriceBreakdown = ({
  price,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
  subCategory,
}) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const ratePerUnit = Number(price ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const serviceAmount = extraCharges
    ? Number(payableAmount ?? 0) - OveralltransportCharge
    : Number(payableAmount ?? 0);

  const quantity = ratePerUnit > 0 ? serviceAmount / ratePerUnit : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      <h5 className="normal-heading">{t("common.totalBookingPrice")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("common.serviceCharges")}
              <div className="text-muted small">
                {formatPrice(ratePerUnit)} ({subCategory === "combine_harvester" ? t("common.perAcre") : t("common.perQuintal")}) × {quantity.toFixed(2)}{" "}
                {subCategory === "combine_harvester" ? t("common.acres") : t("common.quintals")}
              </div>
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
          <tr>
            <td>{t("common.totalAmountToPay")}</td>
            <td>{formatPrice(payableAmount)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PriceBreakdown;

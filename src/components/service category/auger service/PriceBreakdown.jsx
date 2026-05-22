import { useTranslation } from "react-i18next";
import { formatHoursMinutes } from "../../../utils/formatHoursMinutes ";

const PriceBreakdown = ({
  ratePerHr,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
  drillInfo = [],
}) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  ratePerHr = Number(ratePerHr ?? 0);
  const payable = Number(payableAmount ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const OveralltransportCharge = transportCharge * distanceBeyondRadius;

  const billableHours = ratePerHr > 0 ? (payable - OveralltransportCharge) / ratePerHr : 0;

  const isFixedPrice = ratePerHr > 0 && billableHours > 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      {drillInfo.length > 0 && (
        <div className="mt-3">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>{t("auger.drillInformation")}</th>
              </tr>
            </thead>
            <tbody>
              {drillInfo.map((drill) => (
                <tr key={drill?._id || drill.drillInfoId}>
                  <td className="no-border">
                    {drill.drillDiameter}" ₹ {Number(drill.ratePerInch).toFixed(2)}
                    {t("common.perFeet")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h5 className="normal-heading">{t("common.tentativeCost")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("common.serviceCharges")}
              {isFixedPrice && (
                <div className="text-muted small">
                  {formatPrice(ratePerHr)} {t("common.perHourParentheses")} ×{" "}
                  {formatHoursMinutes(billableHours, t)}
                </div>
              )}
            </td>
            <td>
              {isFixedPrice
                ? formatPrice(payable - OveralltransportCharge)
                : "-Price as per vendor rate card"}
            </td>
          </tr>

          <tr>
            <td>
              {t("common.transportationCharges")}
              {!!transportCharge && (
                <div className="text-muted small">
                  {formatPrice(transportCharge)} {t("common.perKmParentheses")} ×{" "}
                  {distanceBeyondRadius?.toFixed(2)} {t("common.km")}
                </div>
              )}
            </td>
            <td>{formatPrice(OveralltransportCharge)}</td>
          </tr>
        </tbody>

        {isFixedPrice && (
          <tfoot>
            <tr className="fw-bold border-top">
              <td>{t("common.totalAmountToPay")}</td>
              <td>{formatPrice(payable)}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default PriceBreakdown;

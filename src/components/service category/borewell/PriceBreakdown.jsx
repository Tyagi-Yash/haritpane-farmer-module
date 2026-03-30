import { useTranslation } from "react-i18next";

const PriceBreakdown = ({
  boreDigging,
  additionalCharges,
  extraCharges,
  payableAmount,
  distanceBeyondRadius,
  motorInfo = [],
  pipeCharges,
}) => {
  const { t } = useTranslation();
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `₹ ${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const boreRatePerFt = Number(boreDigging ?? 0);
  const transportCharge = extraCharges ? Number(additionalCharges ?? 0) : 0;
  const overallTransportCharge = transportCharge * Number(distanceBeyondRadius ?? 0);

  const boreAmount = extraCharges
    ? Number(payableAmount ?? 0) - overallTransportCharge
    : Number(payableAmount ?? 0);

  const depthOfBorewell = boreRatePerFt > 0 ? boreAmount / boreRatePerFt : 0;

  return (
    <div className="option-wrapper bookingPriceTable mb-0">
      {(motorInfo.length > 0 || pipeCharges) && (
        <>
          <h5 className="normal-heading">{t("borewell.motorPipeDetails")}</h5>
          <table className="table table-sm mb-4">
            <tbody>
              {motorInfo.length > 0 &&
                motorInfo.map((motor) => (
                  <tr key={motor?._id}>
                    <td>
                      {t("borewell.motor")} {motor.motorPower || "-"} {t("borewell.hp")}
                    </td>
                    <td>{motor.motorCost ? formatPrice(motor.motorCost) : "-"}</td>
                  </tr>
                ))}

              {pipeCharges && (
                <tr>
                  <td>{t("borewell.casingPipeCharges")}</td>
                  <td>
                    {formatPrice(pipeCharges)} {t("common.perFeet")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      <br />

      <h5 className="normal-heading">{t("common.tentativeCost")}</h5>

      <table className="table table-borderless">
        <tbody>
          <tr>
            <td>
              {t("borewell.boreDiggingCharges")}
              <div className="text-muted small">
                {formatPrice(boreRatePerFt)} ({t("common.perFeet")}) × {depthOfBorewell.toFixed(2)}{" "}
                {t("common.feet")}
              </div>
            </td>
            <td>{formatPrice(boreAmount)}</td>
          </tr>

          {transportCharge > 0 && (
            <tr>
              <td>
                {t("common.transportationCharges")}
                <div className="text-muted small">
                  {formatPrice(transportCharge)} ({t("common.perKm")}) × {Number(distanceBeyondRadius ?? 0).toFixed(2)}{" "}
                  {t("common.km")}
                </div>
              </td>
              <td>{formatPrice(overallTransportCharge)}</td>
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

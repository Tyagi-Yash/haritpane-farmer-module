import { bookingDetailRenderers } from "../../../utils/bookingDetailRenderers";
import { useTranslation } from "react-i18next";

function BookingDetailsRenderer({ booking }) {
  const { t } = useTranslation();
  const Renderer = bookingDetailRenderers[booking.bookingFor];

  if (!Renderer) {
    return <p>{t("progress.unsupportedServiceType")}</p>;
  }

  return <Renderer data={booking.raw} />;
}

export default BookingDetailsRenderer;

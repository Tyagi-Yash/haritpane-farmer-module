import { bookingDetailRenderers } from "../../utils/bookingDetailRenderers";

function BookingDetailsRenderer({ booking }) {
  const Renderer = bookingDetailRenderers[booking.bookingFor];

  if (!Renderer) {
    return <p>Unsupported service type</p>;
  }

  return <Renderer data={booking.raw} />;
}

export default BookingDetailsRenderer;

export const augerAdapter = (item) => {
  const service = item.serviceDetails || {};
  const drill = service.drillInfo?.[0];

  let priceValue = 0;
  let priceUnit = "";
  const bookingAmount = Number(item.amount || 0);
  if (bookingAmount > 0) {
    priceValue = bookingAmount;
  } else if (service.ratePerHr) {
    priceValue = Number(service.ratePerHr || 0);
    priceUnit = "/hour";
  } else if (drill?.ratePerInch) {
    priceValue = Number(drill.ratePerInch || 0);
    priceUnit = "/Running ft";
  }

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: service.augerImg?.[0] || "",
    businessName: service.businessName || "",
    rating: service.rating ?? "N/A",
    amount: Number(priceValue || 0).toFixed(2) + priceUnit,

    raw: item,
  };
};

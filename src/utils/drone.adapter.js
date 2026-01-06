export const droneAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item.amount || 0);

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: service.droneImgs?.[0] || "",
    businessName: service.businessName || "No Discription",
    amount: priceValue.toFixed(2),
    rating: service.rating ?? "N/A",

    raw: item,
  };
};

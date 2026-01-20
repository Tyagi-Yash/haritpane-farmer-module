export const labourAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item.amount || 0);

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: "",
    businessName: service.businessName || "No Discription",
    amount: priceValue.toFixed(2),
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

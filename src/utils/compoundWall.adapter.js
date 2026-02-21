export const compoundWallAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item?.perMeter || 0);

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: service.toolsImges?.[0] || "",
    businessName: service.businessName || "No Discription",
    amount: `${priceValue.toFixed(2)} /m²`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

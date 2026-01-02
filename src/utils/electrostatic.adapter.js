export const electrostaticAdapter = (item) => {
  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: item.serviceDetails.equipmentImage?.[0] || "",
    businessName: item.serviceDetails.businessName || "",
    amount: Number(item.amount || 0).toFixed(2),
    rating: item.serviceDetails.rating ?? "N/A",

    raw: item,
  };
};

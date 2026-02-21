export const augerAdapter = (item) => {
  const service = item.serviceDetails || {};

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: service.augerImg?.[0] || "",
    businessName: service.businessName || "No Discription",
    rating: item.providerDetails?.averageRating ?? "N/A",
    amount: `${Number(item?.ratePerHr || 0).toFixed(2)} /hour`,

    raw: item,
  };
};

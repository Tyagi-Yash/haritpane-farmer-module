export const compoundWallAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item?.perMeter || 0);
  const formatPrice = (amount) => {
    const num = Number(amount ?? 0);
    return `${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: service.toolsImges?.[0] || "",
    businessName: service.businessName || "No Discription",
    amount: `${formatPrice(priceValue)} /m²`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

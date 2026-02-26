export const droneAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item?.chargePerAcre || 0);
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
    image: service.droneImgs?.[0] || "",
    businessName: service.businessName || "No Discription",
    amount: `${formatPrice(priceValue)} /acre`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

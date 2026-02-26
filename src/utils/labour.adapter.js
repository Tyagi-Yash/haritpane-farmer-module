export const labourAdapter = (item) => {
  const service = item.serviceDetails || {};
  const priceValue = Number(item?.dailyWage || 0);
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
    image: "",
    businessName: service.businessName || "No Discription",
    amount: `${formatPrice(priceValue)} /day wage`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

export const augerAdapter = (item) => {
  const service = item.serviceDetails || {};
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
    image: service.augerImg?.[0] || "",
    businessName: service.businessName || "No Discription",
    rating: item.providerDetails?.averageRating ?? "N/A",
    amount: `${formatPrice(item?.ratePerHr || 0)} /hour`,

    raw: item,
  };
};

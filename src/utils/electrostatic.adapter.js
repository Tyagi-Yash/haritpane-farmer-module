export const electrostaticAdapter = (item) => {
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
    image: item.serviceDetails.equipmentImage?.[0] || "",
    businessName: item.serviceDetails.businessName || "No Discription",
    amount: `${formatPrice(item?.chargePerAcre || 0)} /acre`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

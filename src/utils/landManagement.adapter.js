export const landManagementAdapter = (item) => {
  const info = item?.serviceDetails?.Info?.find((i) => i._id === item.tractorInfoId);
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
    image: info?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: `${formatPrice(item?.price || 0)} /${info?.equipmentInformation === "Trolly" ? "km" : "acre"}`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

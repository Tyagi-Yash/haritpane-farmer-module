export const harvesterAdapter = (item) => {
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
    image: item.serviceDetails?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: `${formatPrice(item?.price || 0)} /${item?.serviceDetails?.subCategory === "combine_harvester" ? "acre" : "quintal"}`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

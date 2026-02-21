export const harvesterAdapter = (item) => {
  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: item.serviceDetails?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: `${Number(item?.price || 0).toFixed(2)} /${item?.serviceDetails?.subCategory === "combine_harvester" ? "acre" : "quintal"}`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

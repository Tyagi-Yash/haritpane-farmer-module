export const landManagementAdapter = (item) => {
  const info = item.serviceDetails.Info.find((i) => i._id === item.tractorInfoId);

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: info?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: Number(info.price || 0).toFixed(2),
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

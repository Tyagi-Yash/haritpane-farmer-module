export const landManagementAdapter = (item) => {
  const info = item.serviceDetails.Info.find((i) => i._id === item.tractorInfoId);

  return {
    id: item._id,
    bookingId: item.booking_id,
    bookingFor: item.bookingFor,
    image: info?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: Number(item.amount || 0).toFixed(2),
    rating: item.serviceDetails?.rating ?? "N/A",

    raw: item,
  };
};

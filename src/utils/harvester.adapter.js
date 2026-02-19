export const harvesterAdapter = (item) => {
  const info = item.serviceDetails.priceInfo.find(
    (i) => i.cropType.toLowerCase() === item.typeOfCrop.toLowerCase(),
  );
  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: item.serviceDetails?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: Number(item?.price || 0).toFixed(2),
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

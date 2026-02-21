export const electrostaticAdapter = (item) => {
  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: item.serviceDetails.equipmentImage?.[0] || "",
    businessName: item.serviceDetails.businessName || "No Discription",
    amount: `${Number(item?.chargePerAcre || 0).toFixed(2)} /acre`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

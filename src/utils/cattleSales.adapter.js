export const cattleAdapter = (item) => {
  const basicInfo =
    item.serviceDetails?.basicInfo?.find((info) => info._id === item.basicInfoId) ||
    item.serviceDetails?.basicInfo?.[0];

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: basicInfo?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: Number(basicInfo?.sellingPrice || 0).toFixed(2),
    rating: item.serviceDetails?.rating ?? "N/A",

    raw: item,
  };
};

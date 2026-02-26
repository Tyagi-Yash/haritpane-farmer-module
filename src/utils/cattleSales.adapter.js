export const cattleAdapter = (item) => {
  const basicInfo =
    item.serviceDetails?.basicInfo?.find((info) => info._id === item.basicInfoId) ||
    item.serviceDetails?.basicInfo?.[0];
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
    image: basicInfo?.images?.[0] || "",
    businessName: item.serviceDetails?.businessName || "No Discription",
    amount: formatPrice(item?.sellingPrice || 0),
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

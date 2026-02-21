import DungforFarming from "../assets/images/cowdungstatus.png";

export const cowdungAdapter = (item) => {
  const priceValue = Number(item.amount || 0);

  return {
    id: item._id,
    bookingId: item._id,
    bookingFor: item.bookingFor,
    image: DungforFarming,
    businessName: item.serviceDetails.businessName || "",
    amount: `${priceValue.toFixed(2)} /ton${
      item?.serviceDetails?.dungType ? ` (${item.serviceDetails.dungType})` : ""
    }`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

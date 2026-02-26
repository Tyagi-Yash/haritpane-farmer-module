import DungforFarming from "../assets/images/cowdungstatus.png";

export const cowdungAdapter = (item) => {
  const priceValue = Number(item.amount || 0);
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
    image: DungforFarming,
    businessName: item.serviceDetails.businessName || "",
    amount: `${formatPrice(priceValue)} /ton${
      item?.serviceDetails?.dungType ? ` (${item.serviceDetails.dungType})` : ""
    }`,
    rating: item.providerDetails?.averageRating ?? "N/A",

    raw: item,
  };
};

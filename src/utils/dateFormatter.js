export const formatDate = (date) => {
  if (!date) return "N/A";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

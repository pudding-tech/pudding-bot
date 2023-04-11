
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("no-NO", {
    timeZoneName: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric"
  }).replace(",", "");
};

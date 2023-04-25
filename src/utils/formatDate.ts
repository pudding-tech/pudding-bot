
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    timeZoneName: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).replace("at", "");
};

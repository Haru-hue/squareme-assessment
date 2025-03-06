export const formatDate = (dateString: string): string => {
  const [month, day, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

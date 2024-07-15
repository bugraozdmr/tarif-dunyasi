export const formatCreatedAt = (createdAt : Date) : string => {
  const date = new Date(createdAt);
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

import dayjs from "dayjs";

export const formatDate = (date) => {
  const formattedDate = dayjs(date).format("MMM D, YYYY h:mm A");

  if (formattedDate === "Invalid Date") {
    return "";
  }

  return formattedDate;
};

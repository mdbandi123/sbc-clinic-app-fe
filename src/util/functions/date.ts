import dayjs from "dayjs"

export const formatDate = (date) =>{
  return dayjs(date).format('MMM D, YYYY h:mm A');
}
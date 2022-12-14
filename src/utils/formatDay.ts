import dayjs from "dayjs";

export const caculateAge = (birth_date: string) => {
  const now = dayjs(new Date());
  return Math.ceil(now.diff(birth_date, "year", true));
}

export const changeFormateDate = (oldDate: string) => {
  const [day, time] = oldDate.split(" ");
  return day.toString().split("-").reverse().join("-") + " " + time;
}
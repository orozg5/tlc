import { convertDateTime } from "./convertDateTime";

export function getTimeDifference(term: any) {
  const [date, time] = term.split(", ");
  const [day, month, year] = date.split("/");
  const [start, end] = time.split("-");
  const [hour, minute] = start.split(":");

  let sub = 1;
  let termHour = hour;

  if (Number(month) >= 4 && Number(month) <= 10) sub = 2;
  if (Number(hour) < 10) termHour = "0" + (Number(hour) - sub);

  const termDateTime =
    year.trim() + "-" + month.trim() + "-" + day.trim() + "T" + termHour.trim() + ":" + minute.trim() + "Z";

  const theTerm = new Date(termDateTime);
  const now = new Date(convertDateTime(new Date()));
  const termMinusTwelve = new Date(theTerm);
  termMinusTwelve.setHours(theTerm.getHours() - 12);

  return now <= termMinusTwelve;
}

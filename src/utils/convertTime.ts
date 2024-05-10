export function convertTime(datetime: string) {
  if (datetime) {
    const [date, time] = datetime.split("T");
    const [day, month, year] = date.split("-");
    const [hour, minute, second] = time.split(":");

    let sub = 1;

    if (Number(month) >= 4 && Number(month) <= 10) sub = 2;
    let hours = Number(hour) + sub;
    if (hours > 24) hours = hours - 24;

    const theDateTime = year.trim() + "-" + month.trim() + "-" + day.trim() + ", " + hours + ":" + minute.trim();

    return theDateTime;
  }
  return datetime;
}

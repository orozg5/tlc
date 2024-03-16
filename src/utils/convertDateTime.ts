export function convertDateTime(datetime: Date) {
  return `${datetime.getFullYear()}-${(datetime.getMonth() + 1).toString().padStart(2, "0")}-${datetime
    .getDate()
    .toString()
    .padStart(2, "0")}T${datetime.getHours().toString().padStart(2, "0")}:${datetime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

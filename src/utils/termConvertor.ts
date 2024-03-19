export default function termConvertor(eventClickInfo: any) {
  const startDate = eventClickInfo.event.start.toLocaleString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Zagreb",
  });
  const endDate = eventClickInfo.event.end.toLocaleString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Zagreb",
  });
  const term =
    startDate.split(",")[0] +
    ", " +
    (Number(startDate.split(",")[1].split(":")[0]) - 1) +
    ":" +
    startDate.split(",")[1].split(":")[1] +
    " - " +
    (Number(endDate.split(",")[1].split(":")[0]) - 1) +
    ":" +
    endDate.split(",")[1].split(":")[1];

  return term;
}

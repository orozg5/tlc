export default function termConvertor(eventClickInfo: any) {
  const startDate = eventClickInfo.event.start.toLocaleString("en-AU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Zagreb",
  });
  const endDate = eventClickInfo.event.end.toLocaleString("en-AU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Zagreb",
  });

  let sub = 1;
  if (
    Number(startDate.split(",")[0].split("/")[1].split("/")[0]) >= 4 &&
    Number(startDate.split(",")[0].split("/")[1].split("/")[0]) <= 10
  ) {
    sub = 2;
  }

  const term =
    startDate.split(",")[0] +
    ", " +
    (Number(startDate.split(",")[1].split(":")[0]) - sub) +
    ":" +
    startDate.split(",")[1].split(":")[1] +
    " - " +
    (Number(endDate.split(",")[1].split(":")[0]) - sub) +
    ":" +
    endDate.split(",")[1].split(":")[1];

  return term;
}

const monthNames = [
  "Stycznia",
  "Lutego",
  "Marca",
  "Kwietnia",
  "Maja",
  "Czerwca",
  "Lipca",
  "Sierpnia",
  "Września",
  "Października",
  "Listopada",
  "Grudnia",
];

export const DayMonthYear = (_date) => {
  let date = new Date(_date);
  let day = String(date.getDate());
  let year = String(date.getFullYear()).padStart(2, "0");
  return `${day} ${monthNames[date.getMonth()]} ${year}`;
};

export const DayMonthYearAPI = (_date) => {
  let date = new Date(_date);
  let day = String(date.getDate());
  let year = String(date.getFullYear()).padStart(2, "0");
  return `${year}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${day.padStart(2, "0")}`;
};

export const MonthYear = (_date) => {
  let date = new Date(_date);
  let year = String(date.getFullYear()).padStart(2, "0");
  return `${monthNames[date.getMonth()]} ${year}`;
};

export const DayMonthYearYears = (_date) => {
  let date = new Date(_date);
  let currentDate = new Date();
  let day = String(date.getDate());
  let year = String(date.getFullYear()).padStart(2, "0");
  let yearsDiff = currentDate.getFullYear() - date.getFullYear();
  return `${day} ${monthNames[date.getMonth()]} ${year} (${yearsDiff} lat )`;
};

export const DayMonthYearClassic = (_date) => {
  let date = new Date(_date);
  let day = String(date.getDate());
  let year = String(date.getFullYear()).padStart(2, "0");
  return `${day}.${String(date.getMonth() + 1).padStart(2, "0")}.${year}`;
};

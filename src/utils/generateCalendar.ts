const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();
  const lastDate = lastDay.getDate();
  const prevLastDate = prevLastDay.getDate();

  const prevDates = Array.from(
    { length: firstDayIndex },
    (_, i) => prevLastDate - i,
  ).reverse();

  const currentDates = Array.from({ length: lastDate }, (_, i) => i + 1);

  const nextDates = Array.from({ length: 6 - lastDayIndex }, (_, i) => i + 1);

  return { prevDates, currentDates, nextDates };
};

export default generateCalendar;

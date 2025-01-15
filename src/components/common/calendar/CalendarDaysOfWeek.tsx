interface CalendarDaysOfWeekProps {
  daysOfWeek: string[];
  style: string;
}

export function CalendarDaysOfWeek({
  daysOfWeek,
  style,
}: CalendarDaysOfWeekProps) {
  return (
    <div className='flex h-[2.625rem] w-full justify-between text-caption-normal text-gray-400'>
      {daysOfWeek.map((day) => (
        <div key={day} className={style}>
          {day}
        </div>
      ))}
    </div>
  );
}

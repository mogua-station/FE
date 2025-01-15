import ArrowIcon from "@/assets/images/icons/arrow_left.svg";

interface CalendarHeaderProps {
  year: number;
  month: number;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export function CalendarHeader({
  year,
  month,
  handlePrevMonth,
  handleNextMonth,
  isPrevDisabled,
  isNextDisabled,
}: CalendarHeaderProps) {
  return (
    <div className='flex w-full items-center justify-between text-gray-100'>
      <button
        className='size-6 text-gray-100 disabled:text-gray-300'
        onClick={handlePrevMonth}
        disabled={isPrevDisabled}
      >
        <ArrowIcon className='size-full' />
      </button>
      <div className='text-body-1-normal'>
        {year}년 {month + 1}월
      </div>
      <button
        className='size-6 text-gray-100 disabled:text-gray-300'
        onClick={handleNextMonth}
        disabled={isNextDisabled}
      >
        <ArrowIcon className='size-full rotate-180' />
      </button>
    </div>
  );
}

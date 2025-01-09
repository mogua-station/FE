"use client";

import { useRef } from "react";
import IconButton from "../buttons/IconButton";
import SolidButton from "../buttons/SolidButton";
import Calendar from "../Calendar";
import InfoIcon from "@/assets/images/icons/info.svg";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import useModal from "@/hooks/useModal";
import { useSelectedDateRange } from "@/hooks/useSelectedDateRange";

const CALENDAR_MODAL_TITLE = "모집 기간";

function CalendarModal({
  onDateChange,
  isFilter = false,
  isDark = false,
}: {
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  isFilter?: boolean;
  isDark?: boolean;
}) {
  const resetCalendarRef = useRef<(() => void) | undefined>(undefined);
  const { closeModal, unmountModal } = useModal();
  const { selectedDates, setSelectedDates } = useSelectedDateRange();

  const handleDateChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setSelectedDates(dates);
    onDateChange(dates);
  };

  const handleDateReset = () => {
    setSelectedDates({ startDate: null, endDate: null });
    if (resetCalendarRef.current) {
      resetCalendarRef.current();
    }
  };

  const handleComplete = () => {
    closeModal();
    unmountModal();
  };

  const isSelecting = !!selectedDates.startDate || !!selectedDates.endDate;

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='flex w-full flex-col items-center gap-6'>
        <Calendar
          onDateChange={handleDateChange}
          exposeOnDatesReset={(fn) => {
            resetCalendarRef.current = fn;
          }}
        />

        <div className='flex w-full items-center justify-center border-t border-gray-700'>
          <div className='h-[3.25rem] w-[23.4375rem] px-5 py-4 text-body-1-normal font-semibold text-gray-400'>
            {selectedDates.startDate
              ? `${selectedDates.startDate.toLocaleDateString()} - ${selectedDates.endDate ? selectedDates.endDate.toLocaleDateString() : ""}`
              : "기간을 선택해주세요"}
          </div>
        </div>
      </div>

      {isFilter && (
        <div className='w-[23.4375rem] px-4 pb-2 pt-1'>
          <div className='flex w-full items-center gap-2 rounded-2xl bg-gray-800 px-5 py-[.8125rem] text-label-normal font-medium text-primary'>
            <InfoIcon className='size-6 fill-primary' />
            범위는 최대 6개월까지 설정할 수 있어요
          </div>
        </div>
      )}

      <div className='flex w-[23.4375rem] justify-center gap-[.6875rem] px-5 py-4'>
        <IconButton
          size='large'
          variant='secondary'
          mode={isDark ? "special" : "default"}
          className='w-fit px-6 py-4'
          onClick={handleDateReset}
        >
          <ResetIcon className='size-6 stroke-gray-400' />
        </IconButton>

        <SolidButton
          state={isSelecting ? "activated" : "default"}
          mode={!isDark ? "special" : "default"}
          onClick={handleComplete}
        >
          완료
        </SolidButton>
      </div>
    </div>
  );
}

export { CalendarModal, CALENDAR_MODAL_TITLE };

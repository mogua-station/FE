"use client";

import { useRef } from "react";
import SolidButton from "../buttons/SolidButton";
import Calendar from "../Calendar";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import useModal from "@/hooks/useModal";
import { useSelectedDateRange } from "@/hooks/useSelectedDateRange";

const CALENDAR_MODAL_TITLE = "모집 기간";

function CalendarModal({
  onDateChange,
}: {
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
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

        <div className='w-[23.4375rem] border-t border-gray-700'>
          <div className='h-[3.25rem] w-full px-5 py-4 text-body-1-normal font-semibold text-gray-400'>
            {selectedDates.startDate
              ? `${selectedDates.startDate.toLocaleDateString()} - ${selectedDates.endDate ? selectedDates.endDate.toLocaleDateString() : ""}`
              : "기간을 선택해주세요"}
          </div>
        </div>
      </div>

      <div className='flex w-[23.4375rem] justify-center gap-[.6875rem] px-5 py-4'>
        <SolidButton
          hierarchy='secondary'
          className='w-fit px-6 py-4'
          onClick={handleDateReset}
        >
          <ResetIcon className='size-6 stroke-gray-400' />
        </SolidButton>

        <SolidButton
          state={isSelecting ? "activated" : "inactive"}
          onClick={handleComplete}
        >
          완료
        </SolidButton>
      </div>
    </div>
  );
}

export { CalendarModal, CALENDAR_MODAL_TITLE };

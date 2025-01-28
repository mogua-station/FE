"use client";

import { useState } from "react";
import IconButton from "../../common/buttons/IconButton";
import SolidButton from "../../common/buttons/SolidButton";
import { CalendarModal } from "../../common/modals/CalendarModal";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import { type DateType } from "@/types/meetup.type";

export default function MeetingDateModal({
  selectedDates,
  onDateChange,
  close,
}: {
  selectedDates: DateType;
  onDateChange: (dates: DateType) => void;
  close: () => void;
}) {
  const [currentDate, setCurrentDate] = useState<DateType>(selectedDates);

  const handleReset = () => {
    setCurrentDate({ startDate: null, endDate: null });
    onDateChange({ startDate: null, endDate: null });
  };

  const handleComplete = () => {
    onDateChange(currentDate);
    close();
  };

  return (
    <>
      <CalendarModal
        selectedDates={currentDate}
        onDateChange={(date) => setCurrentDate(date)}
      />

      <div className='flex w-full justify-center'>
        <div className='flex w-[23.4375rem] gap-[.6875rem] px-5 py-4'>
          <IconButton
            size='large'
            variant='secondary'
            mode='special'
            className='w-fit px-6 py-4'
            onClick={handleReset}
          >
            <ResetIcon className='size-6 stroke-gray-400' />
          </IconButton>

          <SolidButton
            disabled={!currentDate.startDate || !currentDate.endDate}
            state={
              currentDate.startDate && currentDate.endDate
                ? "activated"
                : "default"
            }
            onClick={handleComplete}
          >
            완료
          </SolidButton>
        </div>
      </div>
    </>
  );
}

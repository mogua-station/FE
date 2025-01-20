"use client";

import { useEffect, useState } from "react";
import IconButton from "../../common/buttons/IconButton";
import SolidButton from "../../common/buttons/SolidButton";
import { CalendarModal } from "../../common/modals/CalendarModal";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import useModal from "@/hooks/useModal";
import type { DateType } from "@/types/meetup.type";

export default function RecruitmentDateModals({
  initDate,
  onDateChange,
}: {
  initDate: DateType;
  onDateChange: (dates: DateType) => void;
}) {
  const today = initDate.startDate ?? new Date();
  const [selectedDate, setSelectedDate] = useState<DateType>({
    startDate: today,
    endDate: initDate.endDate ?? null,
  });

  const { closeModal } = useModal();

  const handleReset = () => {
    setSelectedDate({ startDate: today, endDate: null });
    onDateChange({ startDate: null, endDate: null });
  };

  const handleComplete = () => {
    if (selectedDate.endDate) onDateChange(selectedDate);
    closeModal();
  };

  useEffect(() => {
    if (
      selectedDate.startDate?.toLocaleDateString() !==
      today.toLocaleDateString()
    ) {
      if (
        selectedDate.startDate &&
        new Date(selectedDate.startDate) > new Date(today)
      ) {
        setSelectedDate({ startDate: today, endDate: selectedDate.startDate });
      } else {
        setSelectedDate({ ...selectedDate, startDate: today });
      }
    }
  }, [selectedDate.startDate]);

  return (
    <>
      <CalendarModal
        selectedDates={selectedDate}
        onDateChange={(date) => setSelectedDate({ ...selectedDate, ...date })}
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
            disabled={!selectedDate.endDate}
            state={selectedDate.endDate ? "activated" : "default"}
            onClick={handleComplete}
          >
            완료
          </SolidButton>
        </div>
      </div>
    </>
  );
}

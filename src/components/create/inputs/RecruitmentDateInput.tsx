"use client";

import { useEffect, useState } from "react";
import RecruitmentDateModals from "../modals/RecruitmentDateModals";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import type { DateType } from "@/types/meetup.type";
import modal from "@/utils/modalController";

export default function RecruitmentDateInput({
  initDate,
  onChange,
  isDisabled,
}: {
  initDate: DateType;
  onChange: (date: DateType) => void;
  isDisabled?: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    startDate: initDate.startDate ?? new Date(),
    endDate: initDate.endDate ?? null,
  });

  useEffect(() => {
    if (initDate.endDate) {
      setSelectedDate(initDate);
    }
  }, [initDate]);

  const handleClick = () => {
    modal.open(
      ({ close }) => (
        <RecruitmentDateModals
          initDate={initDate}
          onDateChange={(date: DateType) => {
            setSelectedDate({
              startDate: initDate?.startDate ?? selectedDate.startDate,
              endDate: date.endDate,
            });
            if (date.endDate) onChange(date);
          }}
          close={close}
        />
      ),
      { title: "모집 기간" },
    );
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={isDisabled}
      className={`relative flex h-[3.375rem] flex-1 items-center rounded-xl border border-gray-800 bg-gray-900 px-4 py-[1.125rem] text-body-2-normal font-medium ${selectedDate.endDate ? "border-2 border-primary text-gray-200" : "text-gray-400"}`}
    >
      {selectedDate.endDate
        ? selectedDate.endDate.toLocaleDateString()
        : "종료 날짜"}
      <ArrowDownIcon className='absolute right-1 top-1/2 size-6 -translate-y-1/2 tablet:right-4' />
    </button>
  );
}

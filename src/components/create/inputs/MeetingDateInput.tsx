"use client";

import { useState } from "react";
import MeetingDateModal from "../modals/MeetingDateModal";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import { type DateType } from "@/types/meetup.type";
import modal from "@/utils/modalController";

export default function MeetingDateInput({
  initDate,
  onChange,
}: {
  initDate: DateType;
  onChange: (date: DateType) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<DateType>(
    initDate ?? {
      startDate: null,
      endDate: null,
    },
  );

  const handleClick = () => {
    modal.open(
      ({ close }) => (
        <MeetingDateModal
          onDateChange={(date) => {
            setSelectedDate(date);
            onChange(date);
          }}
          selectedDates={selectedDate}
          close={close}
        />
      ),
      { title: "날짜 선택" },
    );
  };

  const StartDateButton = () => {
    return (
      <button
        type='button'
        onClick={handleClick}
        className='relative flex h-[3.375rem] flex-1 items-center rounded-xl border border-gray-800 bg-gray-900 px-4 py-[1.125rem] text-gray-400'
      >
        {selectedDate.startDate
          ? selectedDate.startDate.toLocaleDateString()
          : "시작 날짜"}
        <ArrowDownIcon className='absolute right-1 top-1/2 size-6 -translate-y-1/2 tablet:right-4' />
      </button>
    );
  };

  const EndDateButton = () => {
    return (
      <button
        type='button'
        onClick={handleClick}
        className='relative flex h-[3.375rem] flex-1 items-center rounded-xl border border-gray-800 bg-gray-900 px-4 py-[1.125rem] text-gray-400'
      >
        {selectedDate.endDate
          ? selectedDate.endDate.toLocaleDateString()
          : "종료 날짜"}
        <ArrowDownIcon className='absolute right-1 top-1/2 size-6 -translate-y-1/2 tablet:right-4' />
      </button>
    );
  };

  return (
    <div className='flex gap-[.6875rem]'>
      <StartDateButton />
      <EndDateButton />
    </div>
  );
}

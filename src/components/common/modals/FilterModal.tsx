"use client";

import { useState } from "react";
import { CalendarModal } from "./CalendarModal";

type FILTER_STATE = "지역" | "상태" | "날짜";

export default function FilterModal({
  onDateChange,
}: {
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}) {
  const [filter, setFilter] = useState<FILTER_STATE>("지역");

  const handleFilterChange = (f: FILTER_STATE) => {
    setFilter(f);
  };

  const renderFilter = () => {
    switch (filter) {
      case "지역":
        return <div>지역</div>;
      case "상태":
        return <div>상태</div>;
      case "날짜":
        return <CalendarModal onDateChange={onDateChange} />;
    }
  };

  const selectedStyle = (f: FILTER_STATE) =>
    filter === f
      ? "border-b-2 border-gray-200 text-gray-100 transition-all duration-300"
      : "border-transparent text-gray-500 transition-all duration-300";

  return (
    <div className='r flex min-h-[33.9375rem] w-full flex-col'>
      <div className='flex h-12 items-center gap-4 border-b border-gray-800'>
        <button
          className={`ml-5 h-full w-[3.5625rem] border-b-2 text-body-2-normal font-semibold ${selectedStyle("지역")}`}
          onClick={() => handleFilterChange("지역")}
        >
          지역
        </button>
        <button
          className={`h-full w-[3.5625rem] border-b-2 text-body-2-normal font-semibold ${selectedStyle("상태")}`}
          onClick={() => handleFilterChange("상태")}
        >
          상태
        </button>
        <button
          className={`h-full w-[3.5625rem] border-b-2 text-body-2-normal font-semibold ${selectedStyle("날짜")}`}
          onClick={() => handleFilterChange("날짜")}
        >
          날짜
        </button>
      </div>

      {renderFilter()}
    </div>
  );
}

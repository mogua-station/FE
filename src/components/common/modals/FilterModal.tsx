"use client";

import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import CityModal from "./CityModal";
import StateModal from "./StateModal";
import { type CityType, type StateType } from "@/types/overlay.type";

type FILTER_STATE = "지역" | "상태" | "날짜";

export default function FilterModal({
  selectedFilter,
  onDateChange,
  onStateChange,
  onCityChange,
}: {
  selectedFilter: {
    city: CityType;
    state: StateType;
    date: {
      startDate: Date | null;
      endDate: Date | null;
    };
  };
  onDateChange: (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  onStateChange: (state: StateType) => void;
  onCityChange: (city: CityType) => void;
}) {
  const [filter, setFilter] = useState<FILTER_STATE>("지역");

  const handleFilterChange = (f: FILTER_STATE) => {
    setFilter(f);
  };

  const renderFilter = () => {
    switch (filter) {
      case "지역":
        return (
          <CityModal
            selectedCity={selectedFilter.city}
            onCityChange={onCityChange}
          />
        );
      case "상태":
        return (
          <StateModal
            selectedState={selectedFilter.state}
            onStateChange={onStateChange}
          />
        );
      case "날짜":
        return (
          <CalendarModal
            selectedDates={selectedFilter.date}
            onDateChange={onDateChange}
            isFilter
            isDark
          />
        );
    }
  };

  const selectedStyle = (f: FILTER_STATE) =>
    filter === f
      ? "border-b-2 border-gray-200 text-gray-100 transition-all duration-300"
      : "border-transparent text-gray-500 transition-all duration-300";

  return (
    <div className='flex min-h-[38.75rem] w-full flex-col'>
      <div className='flex h-12 items-center justify-center gap-4 border-b border-gray-800'>
        <div className='flex w-[23.4375rem] items-center gap-4'>
          <button
            className={`ml-5 h-full border-b-2 px-4 py-3.5 text-body-2-normal font-semibold ${selectedStyle("지역")}`}
            onClick={() => handleFilterChange("지역")}
          >
            지역
          </button>
          <button
            className={`h-full border-b-2 px-4 py-3.5 text-body-2-normal font-semibold ${selectedStyle("상태")}`}
            onClick={() => handleFilterChange("상태")}
          >
            상태
          </button>
          <button
            className={`h-full border-b-2 px-4 py-3.5 text-body-2-normal font-semibold ${selectedStyle("날짜")}`}
            onClick={() => handleFilterChange("날짜")}
          >
            날짜
          </button>
        </div>
      </div>

      {renderFilter()}
    </div>
  );
}

"use client";

import { useState } from "react";
import CityModal from "./CityModal";
import StateModal from "./StateModal";
import ResetIcon from "@/assets/images/icons/reset_thin.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import { CalendarModal } from "@/components/common/modals/CalendarModal";
import useModal from "@/hooks/useModal";
import {
  type DateType,
  type CityType,
  type FilterType,
  type StateType,
} from "@/types/meetup.type";

type TAB_STATE = "지역" | "상태" | "날짜";

export default function FilterModal({
  selectedFilter,
  onDateChange,
  onStateChange,
  onCityChange,
}: {
  selectedFilter: FilterType;
  onDateChange: (dates: DateType) => void;
  onStateChange: (state: StateType) => void;
  onCityChange: (city: CityType) => void;
}) {
  const [tab, setTab] = useState<TAB_STATE>("지역");
  const [tempFilter, setTempFilter] = useState<FilterType>({
    ...selectedFilter,
  });
  const { closeModal } = useModal();

  const handleReset = () => {
    const resetValues: Partial<FilterType> = {
      지역: { city: "ALL" as CityType },
      상태: { state: "ALL" as StateType },
      날짜: { date: { startDate: null, endDate: null } as DateType },
    }[tab];
    setTempFilter((prev) => ({ ...prev, ...resetValues }));
  };

  const handleComplete = () => {
    onCityChange(tempFilter.city);
    onStateChange(tempFilter.state);
    onDateChange(tempFilter.date);
    closeModal();
  };

  const renderFilter = () => {
    const filterComponents = {
      지역: (
        <CityModal
          selectedCity={tempFilter.city}
          onCityChange={(city) => setTempFilter((prev) => ({ ...prev, city }))}
        />
      ),
      상태: (
        <StateModal
          selectedState={tempFilter.state}
          onStateChange={(state) =>
            setTempFilter((prev) => ({ ...prev, state }))
          }
        />
      ),
      날짜: (
        <CalendarModal
          selectedDates={tempFilter.date}
          onDateChange={(date) => setTempFilter((prev) => ({ ...prev, date }))}
          isFilter
        />
      ),
    };
    return filterComponents[tab];
  };

  const selectedStyle = (f: TAB_STATE) =>
    `border-b-2 px-4 py-3.5 text-body-2-normal font-semibold transition-all duration-300 ${
      tab === f
        ? "border-gray-200 text-gray-100"
        : "border-transparent text-gray-500"
    }`;

  const tabButtons = ["지역", "상태", "날짜"].map((tabName) => (
    <button
      key={tabName}
      className={`ml-5 h-full ${selectedStyle(tabName as TAB_STATE)}`}
      onClick={() => setTab(tabName as TAB_STATE)}
    >
      {tabName}
    </button>
  ));

  return (
    <div className='flex min-h-[38.75rem] w-full flex-col'>
      <div className='flex h-12 items-center justify-center gap-4 border-b border-gray-800'>
        <div className='flex w-[23.4375rem] items-center gap-4'>
          {tabButtons}
        </div>
      </div>

      {renderFilter()}

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
            state={
              tempFilter.city !== "ALL" ||
              tempFilter.date.startDate ||
              tempFilter.date.endDate ||
              tempFilter.state !== "ALL"
                ? "activated"
                : "default"
            }
            onClick={handleComplete}
          >
            완료
          </SolidButton>
        </div>
      </div>
    </div>
  );
}

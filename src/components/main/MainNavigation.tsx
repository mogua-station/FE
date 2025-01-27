"use client";

import { Suspense, useCallback } from "react";
import FilterControls from "./FilterControls";
import MeetupSelectionDropdown from "./MeetupSelectionDropdown";
import FilterModal from "./modals/FilterModal";
import { useMeetupQueryParams } from "@/hooks/meetup/useMeetupQueryParams";
import { useMeetupUpdateQuery } from "@/hooks/meetup/useMeetupUpdateQuery";
import type {
  FilterType,
  MeetupQueryType,
  MeetupType,
} from "@/types/meetup.type";
import modal from "@/utils/modalController";

function RenderNavigation({
  initialParams,
}: {
  initialParams?: MeetupQueryType;
}) {
  const {
    selectedMeetup,
    setSelectedMeetup,
    selectedOrder,
    setSelectedOrder,
    selectedFilter,
    setSelectedFilter,
  } = useMeetupQueryParams(initialParams);

  useMeetupUpdateQuery(selectedMeetup, selectedFilter, selectedOrder);

  const handleFilterChange = useCallback(
    (
      key: keyof FilterType,
      value: string | { startDate: Date | null; endDate: Date | null },
    ) => {
      setSelectedFilter((prev) => ({ ...prev, [key]: value }));
    },
    [setSelectedFilter],
  );

  const handleOpenFilterModal = useCallback(() => {
    modal.open(
      ({ close }) => (
        <FilterModal
          selectedFilter={selectedFilter}
          onLocationChange={(location) =>
            handleFilterChange("location", location)
          }
          onStateChange={(state) => handleFilterChange("state", state)}
          onDateChange={(dates) => handleFilterChange("date", dates)}
          closeModal={close}
        />
      ),
      { isDark: true },
    );
  }, [handleFilterChange, selectedFilter]);

  const handleSelectMeetup = useCallback(
    (meetup: MeetupType) => {
      setSelectedMeetup(meetup);
      setSelectedFilter((prev) => ({
        ...prev,
        location: "ALL",
        state: "ALL",
        date: { startDate: null, endDate: null },
      }));
      setSelectedOrder("latest");
    },
    [setSelectedFilter, setSelectedMeetup, setSelectedOrder],
  );

  return (
    <nav className='flex w-full items-center justify-between'>
      <MeetupSelectionDropdown
        selectedMeetup={selectedMeetup}
        onSelectMeetup={handleSelectMeetup}
      />
      <FilterControls
        selectedOrder={selectedOrder}
        onOrderChange={setSelectedOrder}
        onOpenFilterModal={handleOpenFilterModal}
      />
    </nav>
  );
}

export default function MainNavigation({
  initialParams,
}: {
  initialParams?: MeetupQueryType;
}) {
  return (
    <Suspense
      fallback={
        <div className='flex h-11 w-full grow items-center justify-between px-5'>
          <div className='h-full w-[6.1875rem] animate-pulse bg-gray-800' />
          <div>
            <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
            <div className='h-full w-[3.25rem] animate-pulse rounded-2xl bg-gray-800' />
          </div>
        </div>
      }
    >
      <RenderNavigation initialParams={initialParams} />
    </Suspense>
  );
}

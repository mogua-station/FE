"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import MeetupSelectionDropdown from "./MeetupSelectionDropdown";
import FilterModal from "./modals/FilterModal";
import useModal from "@/hooks/useModal";
import {
  type LocationType,
  type StateType,
  type FilterType,
  type MeetupType,
  type OrderType,
} from "@/types/meetup.type";

export default function MainNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const [selectedMeetup, setSelectedMeetup] = useState<MeetupType>("STUDY");
  const [selectedOrder, setSelectedOrder] = useState<OrderType>("latest");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    location: "ALL",
    state: "ALL",
    date: { startDate: null, endDate: null },
  });

  useEffect(() => {
    const type = searchParams.get("type") as MeetupType;
    const location = searchParams.get("location") as LocationType;
    const state = searchParams.get("state") as StateType;
    const startDate = searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : null;
    const endDate = searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : null;
    const orderBy = searchParams.get("orderBy") as OrderType;

    if (type) setSelectedMeetup(type);
    setSelectedFilter((prev) => ({
      ...prev,
      location: location || prev.location,
      state: state || prev.state,
      date: { startDate: startDate || null, endDate: endDate || null },
    }));
    if (orderBy) setSelectedOrder(orderBy);
  }, [searchParams]);

  useEffect(() => {
    const type = selectedMeetup;
    const { location, state, date } = selectedFilter;
    const { startDate, endDate } = date;

    const queryObject: Record<string, string> = {};

    if (type !== "STUDY") queryObject.type = type;
    if (location !== "ALL") queryObject.location = location;
    if (state !== "ALL") queryObject.state = state;
    if (selectedOrder !== "latest") queryObject.orderBy = selectedOrder;
    if (startDate) {
      const startYear = startDate.getFullYear();
      const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
      const startDay = String(startDate.getDate()).padStart(2, "0");
      queryObject.startDate = `${startYear}-${startMonth}-${startDay}`;
    }

    if (endDate) {
      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
      const endDay = String(endDate.getDate()).padStart(2, "0");
      queryObject.endDate = `${endYear}-${endMonth}-${endDay}`;
    }

    const query = new URLSearchParams(queryObject).toString();

    router.replace(`?${query}`);
  }, [selectedMeetup, selectedFilter, selectedOrder]);

  const handleFilterChange = (
    key: keyof FilterType,
    value: string | { startDate: Date | null; endDate: Date | null },
  ) => {
    setSelectedFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenFilterModal = () => {
    openModal({
      children: (
        <FilterModal
          selectedFilter={selectedFilter}
          onLocationChange={(location) =>
            handleFilterChange("location", location)
          }
          onStateChange={(state) => handleFilterChange("state", state)}
          onDateChange={(dates) => handleFilterChange("date", dates)}
        />
      ),
      isDark: true,
    });
  };

  return (
    <nav className='flex w-full items-center justify-between'>
      <MeetupSelectionDropdown
        selectedMeetup={selectedMeetup}
        onSelectMeetup={(meetup) => {
          setSelectedMeetup(meetup);
          setSelectedFilter((prev) => ({
            ...prev,
            location: "ALL",
            state: "ALL",
            date: { startDate: null, endDate: null },
          }));
          setSelectedOrder("latest");
        }}
      />
      <FilterControls
        selectedOrder={selectedOrder}
        onOrderChange={setSelectedOrder}
        onOpenFilterModal={handleOpenFilterModal}
      />
    </nav>
  );
}

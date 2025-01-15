"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FilterModal from "./modals/FilterModal";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import FilterIcon from "@/assets/images/icons/filter.svg";
import OrderIcon from "@/assets/images/icons/sort.svg";
import Dropdown from "@/components/common/Dropdown";
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

  // URL 파라미터를 초기 상태로 설정
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

  // URL 파라미터 업데이트
  useEffect(() => {
    const { location, state, date } = selectedFilter;
    const { startDate, endDate } = date;

    const queryObject: Record<string, string> = {
      type: selectedMeetup,
    };

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
      {/* Meetup Selection Dropdown */}
      <Dropdown
        defaultSelected={selectedMeetup}
        align='LL'
        content={[
          {
            label: "스터디",
            value: "STUDY",
            onClick: (value) => {
              setSelectedMeetup(value as MeetupType);
              setSelectedFilter((prev) => ({
                ...prev,
                location: "ALL",
                state: "ALL",
                date: { startDate: null, endDate: null },
              }));
              setSelectedOrder("latest");
            },
          },
          {
            label: "과외",
            value: "TUTORING",
            onClick: (value) => {
              setSelectedMeetup(value as MeetupType);
              setSelectedFilter((prev) => ({
                ...prev,
                location: "ALL",
                state: "ALL",
                date: { startDate: null, endDate: null },
              }));
              setSelectedOrder("latest");
            },
          },
        ]}
      >
        <div className='filter-sm filter-default min-w-[6.1875rem] gap-2.5'>
          <span className='grow text-body-2-normal font-semibold text-gray-200'>
            {selectedMeetup === "STUDY" ? "스터디" : "과외"}
          </span>
          <ArrowDownIcon className='size-6 fill-gray-300' />
        </div>
      </Dropdown>

      {/* Filter & Order Controls */}
      <div className='flex gap-1.5'>
        <button
          onClick={handleOpenFilterModal}
          className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'
        >
          <FilterIcon className='size-6 fill-gray-300' />
        </button>

        <Dropdown
          defaultSelected={selectedOrder}
          content={[
            {
              label: "최근 등록순",
              value: "latest",
              onClick: (value) => setSelectedOrder(value as OrderType),
            },
            {
              label: "모집 마감 임박순",
              value: "deadline",
              onClick: (value) => setSelectedOrder(value as OrderType),
            },
            {
              label: "참여 인원 많은순",
              value: "participant",
              onClick: (value) => setSelectedOrder(value as OrderType),
            },
          ]}
        >
          <div className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'>
            <OrderIcon className='size-6 stroke-gray-300' />
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import FilterModal from "../common/modals/FilterModal";
import ArrowDownIcon from "@/assets/images/icons/arrow_down_fill.svg";
import FilterIcon from "@/assets/images/icons/filter.svg";
import SortIcon from "@/assets/images/icons/sort.svg";
import useModal from "@/hooks/useModal";
import {
  type CityType,
  type StateType,
  type FilterType,
  type MeetupType,
  type SortType,
} from "@/types/meetup.type";

// URL 파라미터를 파싱하는 함수
const parseURLParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    meetup: params.get("meetup") as MeetupType,
    city: params.get("city") as CityType,
    state: params.get("state") as StateType,
    startDate: params.get("startDate")
      ? new Date(params.get("startDate")!)
      : null,
    endDate: params.get("endDate") ? new Date(params.get("endDate")!) : null,
    sort: params.get("sort") as SortType,
  };
};

// URL 파라미터를 업데이트하는 함수
const updateSearchParams = (
  router: ReturnType<typeof useRouter>,
  {
    meetup,
    filter,
    sort,
  }: {
    meetup: MeetupType;
    filter: FilterType;
    sort: SortType;
  },
) => {
  const params = new URLSearchParams();
  params.append("meetup", meetup);

  if (filter.city !== "ALL") params.append("city", filter.city);
  if (filter.state !== "ALL") params.append("state", filter.state);
  if (filter.date.startDate)
    params.append(
      "startDate",
      filter.date.startDate.toISOString().split("T")[0],
    );
  if (filter.date.endDate)
    params.append("endDate", filter.date.endDate.toISOString().split("T")[0]);
  if (sort !== "latest") params.append("sort", sort);

  router.push(`${window.location.pathname}?${params.toString()}`);
};

export default function MainNavigation() {
  const router = useRouter();
  const { openModal } = useModal();

  const [selectedMeetup, setSelectedMeetup] = useState<MeetupType>("study");
  const [selectedSort, setSelectedSort] = useState<SortType>("latest");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    city: "ALL",
    state: "ALL",
    date: { startDate: null, endDate: null },
  });

  // URL 파라미터를 초기 상태로 설정
  useEffect(() => {
    const { meetup, city, state, startDate, endDate, sort } = parseURLParams();

    if (meetup) setSelectedMeetup(meetup);
    setSelectedFilter((prev) => ({
      ...prev,
      city: city || prev.city,
      state: state || prev.state,
      date: { startDate: startDate || null, endDate: endDate || null },
    }));
    if (sort) setSelectedSort(sort);
  }, []);

  // URL 파라미터 업데이트
  useEffect(() => {
    updateSearchParams(router, {
      meetup: selectedMeetup,
      filter: selectedFilter,
      sort: selectedSort,
    });
  }, [selectedMeetup, selectedFilter, selectedSort]);

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
          onCityChange={(city) => handleFilterChange("city", city)}
          onStateChange={(state) => handleFilterChange("state", state)}
          onDateChange={(dates) => handleFilterChange("date", dates)}
        />
      ),
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
            value: "study",
            onClick: (value) => {
              setSelectedMeetup(value as MeetupType);
              setSelectedFilter((prev) => ({
                ...prev,
                city: "ALL",
                state: "ALL",
                date: { startDate: null, endDate: null },
              }));
              setSelectedSort("latest");
            },
          },
          {
            label: "과외",
            value: "tutoring",
            onClick: (value) => {
              setSelectedMeetup(value as MeetupType);
              setSelectedFilter((prev) => ({
                ...prev,
                city: "ALL",
                state: "ALL",
                date: { startDate: null, endDate: null },
              }));
              setSelectedSort("latest");
            },
          },
        ]}
      >
        <div className='filter-sm filter-default min-w-[6.1875rem] gap-2.5'>
          <span className='grow text-body-2-normal font-semibold text-gray-200'>
            {selectedMeetup === "study" ? "스터디" : "과외"}
          </span>
          <ArrowDownIcon className='size-6 fill-gray-300' />
        </div>
      </Dropdown>

      {/* Filter & Sort Controls */}
      <div className='flex gap-1.5'>
        <button
          onClick={handleOpenFilterModal}
          className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'
        >
          <FilterIcon className='size-6 fill-gray-300' />
        </button>

        <Dropdown
          defaultSelected={selectedSort}
          content={[
            {
              label: "최근 등록순",
              value: "latest",
              onClick: (value) => setSelectedSort(value as SortType),
            },
            {
              label: "모집 마감 임박순",
              value: "deadline",
              onClick: (value) => setSelectedSort(value as SortType),
            },
            {
              label: "참여 인원 많은순",
              value: "participant",
              onClick: (value) => setSelectedSort(value as SortType),
            },
          ]}
        >
          <div className='filter-sm filter-default z-10 w-[3.25rem] cursor-pointer'>
            <SortIcon className='size-6 stroke-gray-300' />
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}

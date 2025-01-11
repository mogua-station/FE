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

export default function MainNavigation() {
  const router = useRouter();
  const { openModal } = useModal();

  const [selectedMeetup, setSelectedMeetup] = useState<MeetupType>("study");
  const [selectedSort, setSelectedSort] = useState<SortType>("latest");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    city: "ALL",
    state: "ALL",
    date: {
      startDate: null,
      endDate: null,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const meetup = params.get("meetup") as MeetupType;
    const city = params.get("city") as CityType;
    const state = params.get("state") as StateType;
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const sort = params.get("sort") as SortType;

    if (meetup) setSelectedMeetup(meetup);
    if (city) setSelectedFilter((prev) => ({ ...prev, city }));
    if (state) setSelectedFilter((prev) => ({ ...prev, state }));
    if (startDate || endDate) {
      setSelectedFilter((prev) => ({
        ...prev,
        date: {
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
        },
      }));
    }
    if (sort) setSelectedSort(sort);
  }, []);

  useEffect(() => {
    setSearchParams({ filter: selectedFilter });
  }, [selectedFilter, selectedMeetup, selectedSort]);

  const setSearchParams = ({
    meetup = selectedMeetup,
    filter = selectedFilter,
    sort = selectedSort,
  }: {
    meetup?: MeetupType;
    filter?: FilterType;
    sort?: string;
  }) => {
    const params = new URLSearchParams();

    params.append("meetup", meetup);

    if (filter.city !== "ALL") {
      params.append("city", filter.city);
    }

    if (filter.state !== "ALL") {
      params.append("state", filter.state);
    }

    if (filter.date.startDate) {
      params.append(
        "startDate",
        filter.date.startDate.toISOString().split("T")[0],
      );
    }

    if (filter.date.endDate) {
      params.append("endDate", filter.date.endDate.toISOString().split("T")[0]);
    }

    if (sort !== "latest") {
      params.append("sort", sort);
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const onChangedCity = (value: CityType) => {
    setSelectedFilter((prevFilter) => {
      const newFilter = { ...prevFilter, city: value };
      return newFilter;
    });
  };

  const onChangedState = (value: StateType) => {
    setSelectedFilter((prevFilter) => {
      const newFilter = { ...prevFilter, state: value };
      return newFilter;
    });
  };

  const onChangedDate = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setSelectedFilter((prevFilter) => {
      const newFilter = { ...prevFilter, date: dates };
      return newFilter;
    });
  };

  const handleChangedMeetup = (value: MeetupType) => {
    setSelectedMeetup(value);
  };

  const handleChangedSort = (value: SortType) => {
    setSelectedSort(value);
  };

  const handleOpenFilterModal = () => {
    openModal({
      children: (
        <FilterModal
          selectedFilter={selectedFilter}
          onChangeCity={(city) => onChangedCity(city)}
          onChangeState={(category) => onChangedState(category)}
          onChangeDate={(dates) => onChangedDate(dates)}
        />
      ),
    });
  };

  return (
    <nav className='flex w-full items-center justify-between'>
      <Dropdown
        defaultSelected={selectedMeetup}
        align='LL'
        content={[
          {
            label: "스터디",
            value: "study",
            onClick: (value: string) => {
              handleChangedMeetup(value as MeetupType);
            },
          },
          {
            label: "과외",
            value: "tutoring",
            onClick: (value: string) =>
              handleChangedMeetup(value as MeetupType),
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

      {/* Filter & Sort */}
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
              onClick: (value: string) => handleChangedSort(value as SortType),
            },
            {
              label: "모집 마감 임박순",
              value: "deadline",
              onClick: (value: string) => handleChangedSort(value as SortType),
            },
            {
              label: "참여 인원 많은순",
              value: "participant",
              onClick: (value: string) => handleChangedSort(value as SortType),
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

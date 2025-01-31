"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type {
  MeetupType,
  OrderType,
  FilterType,
  LocationType,
  StateType,
  MeetupQueryType,
} from "@/types/meetup.type";

export function useMeetupQueryParams(initialParams?: MeetupQueryType) {
  const searchParams = useSearchParams();
  const [selectedMeetup, setSelectedMeetup] = useState<MeetupType>(
    initialParams?.type || "STUDY",
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderType>(
    initialParams?.orderBy || "latest",
  );
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    location: (initialParams?.location as LocationType) || "ALL",
    state: (initialParams?.state as StateType) || "ALL",
    date: {
      startDate: initialParams?.startDate
        ? new Date(initialParams.startDate)
        : null,
      endDate: initialParams?.endDate ? new Date(initialParams.endDate) : null,
    },
  });

  useEffect(() => {
    const type = searchParams.get("type") as MeetupType;
    const location = searchParams.get("location") as LocationType;
    const state = searchParams.get("state") as StateType;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const orderBy = searchParams.get("orderBy") as OrderType;

    if (type) setSelectedMeetup(type);
    setSelectedFilter((prev) => ({
      ...prev,
      location: location || prev.location,
      state: state || prev.state,
      date: {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    }));
    if (orderBy) setSelectedOrder(orderBy);
  }, [searchParams]);

  return {
    selectedMeetup,
    setSelectedMeetup,
    selectedOrder,
    setSelectedOrder,
    selectedFilter,
    setSelectedFilter,
  };
}

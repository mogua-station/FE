"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { MeetupType, OrderType, FilterType } from "@/types/meetup.type";

export function useMeetupUpdateQuery(
  selectedMeetup: MeetupType,
  selectedFilter: FilterType,
  selectedOrder: OrderType,
) {
  const router = useRouter();

  useEffect(() => {
    const { location, state, date } = selectedFilter;
    const queryParams = new URLSearchParams();

    if (selectedMeetup !== "STUDY") queryParams.set("type", selectedMeetup);
    if (location !== "ALL") queryParams.set("location", location);
    if (state !== "ALL") queryParams.set("state", state);
    if (selectedOrder !== "latest") queryParams.set("orderBy", selectedOrder);

    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    if (date.startDate)
      queryParams.set("startDate", formatDate(date.startDate));
    if (date.endDate) queryParams.set("endDate", formatDate(date.endDate));

    router.replace(`?${queryParams.toString()}`);
  }, [selectedMeetup, selectedFilter, selectedOrder, router]);
}

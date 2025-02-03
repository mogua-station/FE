import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getMeetupList } from "@/lib/main/meetup.api";
import type {
  OrderType,
  LocationType,
  MeetupType,
  StateType,
} from "@/types/meetup.type";
import { generateQueryKey } from "@/utils/meetup.queryKey";

export const useMeetupList = () => {
  const searchParams = useSearchParams();

  const typeQuery = (searchParams.get("type") as MeetupType) ?? undefined;
  const stateQuery = (searchParams.get("state") as StateType) ?? undefined;
  const locationQuery =
    (searchParams.get("location") as LocationType) ?? undefined;
  const startQuery = searchParams.get("startDate") ?? undefined;
  const endQuery = searchParams.get("endDate") ?? undefined;
  const orderByQuery = (searchParams.get("orderBy") as OrderType) ?? undefined;

  const queryKey = generateQueryKey({
    type: typeQuery,
    state: stateQuery,
    location: locationQuery,
    startDate: startQuery,
    endDate: endQuery,
    orderBy: orderByQuery,
  });

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      getMeetupList({
        page: pageParam,
        limit: 10,
        orderBy: orderByQuery,
        type: typeQuery,
        state: stateQuery,
        location: locationQuery,
        startDate: startQuery,
        endDate: endQuery,
      }),
    getNextPageParam: (lastPage) =>
      !lastPage.isLast ? lastPage.nextPage : undefined,
    initialPageParam: 0,
    retry: 1,
  });
};

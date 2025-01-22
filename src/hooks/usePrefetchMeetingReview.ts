import { QueryClient } from "@tanstack/react-query";

import { fetchMeetupReview } from "@/lib/meetDetail/meetDetailApi";
import { type ReviewQueryProps } from "@/types/review";

export default function usePrefetchMeetingReview(meetupId: number) {
  const queryClient = new QueryClient();
  console.log(123);

  queryClient.prefetchInfiniteQuery({
    queryKey: ["review", meetupId],
    queryFn: ({ pageParam }) =>
      fetchMeetupReview({ pageParams: pageParam, meetupId: meetupId }),
    initialPageParam: 0,
    getNextPageParam: (lastpage: ReviewQueryProps) => {
      return lastpage != null && lastpage.data.length > 0
        ? lastpage.page + 1
        : undefined;
    },
  });
}

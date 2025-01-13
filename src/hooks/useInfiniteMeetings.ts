import { useInfiniteQuery } from "@tanstack/react-query";
import {
  type UserPageSection,
  type StudyType,
  type MyReviewTab,
} from "@/types/user-page";
import { fetchItems } from "@/utils/userPage";

interface UseInfiniteMeetingsProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
}

export function useInfiniteMeetings({
  tab,
  studyType,
  reviewTab,
}: UseInfiniteMeetingsProps) {
  return useInfiniteQuery({
    queryKey: ["meetings", tab, studyType, reviewTab],
    queryFn: ({ pageParam }) =>
      fetchItems({
        tab,
        studyType,
        reviewTab,
        cursor: pageParam,
      }),
    initialPageParam: "1",
    getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
  });
}

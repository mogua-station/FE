import { useInfiniteQuery } from "@tanstack/react-query";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
} from "@/types/user-page";
import { fetchItems } from "@/utils/userPage";

interface UseInfiniteMeetingsProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
}

export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
}: UseInfiniteMeetingsProps) => {
  return useInfiniteQuery({
    queryKey: ["meetings", tab, studyType, reviewTab],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchItems({
        tab,
        studyType,
        reviewTab,
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
